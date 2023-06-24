class Message {
    role
    content

    constructor(content = '', role='user') {
        this.content = content
        this.role = role
    }

    static SystemMessage(content = '') {
        return new Message(content, 'system')
    }

    static UserMessage(content = '') {
        return new Message(content, 'user')
    }

    static AssistantMessage(content = '') {
        return new Message(content, 'assistant')
    }

    /**
     * @param prompt {string}
     * @return {Message[]}
     */
    static CreateResponse(prompt='') {
        const outList = [
            this.SystemMessage(`[System: You are an assistant who creates a prompt, a prompt is a description of an image which is later used to generate an image.
Prompts are formatted like the following: "tag1, tag2, tag3" etc.
Every tag must have a meaning, no nonsensical or made up words.
Extra guidance can be specified when the user gives tags, "[use detailed tags] a girl with blue hair".
Fictional and real characters are allowed, but must be accompanied with extra tags describing the character's traits to ensure the generator gets it correct.
Important tags can be increased in importance with parentheses, like this: "(red hair:1.2)" to make "red hair" more important. Don't go below 0.7, and don't go above 1.5.
You are encouraged to use many tags, even some tags with the same meaning, make sure the important tags come first, select them based on the user's prompt.
important_tags = [best quality, ultra detailed, masterpiece, 1girl, 1boy, solo, {color} hair, {color} eyes, {clothes, or lack thereof}, {appearance info}]
example_tags = [{anime art/cartoon/photorealistic/3d render}, beautiful lighting, dress, tie]  # And much more
DO NOT include "{" or "}" literally, replace them with a fitting word based on its content. For example, {color} could become green, blue or brown for eyes, but different colors for clothes.
Your entire response must just be the tags, nothing more, nothing less. Tags ONLY.
]`),
            this.SystemMessage('[System: Provide your response within a single message, only containing the list of tags, separated by commas.]'),
            this.AssistantMessage('Please provide some guidance, and I will provide a prompt for you!'),
            this.UserMessage('[EXAMPLE] I want a picture of a girl with pink hair and blue eyes.'),
            this.AssistantMessage('best quality, ultra detailed, 1girl, solo, standing, pink hair, long hair, blue eyes, loose hair, medium breasts, white shirt, necktie, smile, looking at viewer'),
            this.SystemMessage('[System: Provide your response within a single message, only containing the list of tags, separated by commas.]'),
            this.AssistantMessage('Please provide some guidance, and I will provide a prompt for you!')
        ]
        if (prompt) outList.push(this.UserMessage(prompt))
        return outList
    }
}

export class API {

    /**
     * @param prompt {string}
     * @param output {HTMLInputElement}
     */
    static openAI(prompt, output) {
        const endpoint = document.data.openaiendpoint !== '' ? document.data.openaiendpoint : 'https://api.openai.com/v1/chat/completions'
        const key = document.data.openaikey
        const model = document.data.openaimodel !== '' ? document.data.openaimodel : 'gpt-3.5-turbo'

        if (document.data.openaistreaming) {
            output.value = 'Starting streaming...';

            (async () => {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: Message.CreateResponse(prompt),  // JSON.stringify should recursively stringify this message array
                        stream: true
                    })
                });
                const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();

                if (!reader) return;
                output.value = ''
                while (true) {
                    // eslint-disable-next-line no-await-in-loop
                    const { value, done } = await reader.read();
                    if (value.startsWith('{')) {
                        try {
                            const jsonValue = JSON.parse(value)
                            if ('error' in jsonValue) {
                                output.value = `ERROR: ${jsonValue.error.message}`
                            }
                            reader.releaseLock()
                            return
                        }
                        catch (e) {
                            output.value = `Something went wrong: ${e}`
                            reader.releaseLock()
                            return
                        }
                    }
                    if (done) break;
                    let dataDone = false;
                    const arr = value.split('\n');
                    arr.forEach((data) => {
                        if (data.length === 0) return; // ignore empty message
                        if (data.startsWith(':')) return; // ignore sse comment message
                        if (data === 'data: [DONE]') {
                            dataDone = true;
                            reader.releaseLock()
                            return;
                        }
                        data = data.substring(data.indexOf('{'), data.lastIndexOf('}')+1)
                        const json = JSON.parse(data);
                        output.value += json?.choices?.[0]?.delta?.content ?? ''
                    });
                    if (dataDone) break;
                }
                document.running = false
            })()
        }
        else {
            output.value = 'Generating prompt... Please wait.'
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: Message.CreateResponse(prompt)  // JSON.stringify should recursively stringify this message array
                })
            }).then(r => r.json())
                .then(r => {
                    if ('error' in r) {
                        output.value = `ERROR: ${r.error.message}`
                    }
                    else {
                        output.value = r?.choices?.[0]?.message?.content ?? `Something went wrong, Response: ${r}`
                    }
                    document.running = false
                })
                .catch((reason) => {
                    output.value = `Something went wrong: ${reason}`
                    document.running = false
                })
        }
    }

    /**
     * @param prompt {string}
     * @param output {HTMLInputElement}
     */
    static oobabooga(prompt, output) {
        const streaming = document.data.textgenwebuistreaming
        let endpoint = document.data.textgenwebuiendpoint
        let streamEndpoint = document.data.textgenwebuistreamendpoint
        endpoint = endpoint !== '' ? endpoint + '/v1' : 'http://localhost:5000/api/v1'
        streamEndpoint = streamEndpoint !== '' ? streamEndpoint : 'ws://localhost:5005/api/v1/stream'

        const blockingEndpoint = endpoint + '/generate'

        const chat = Message.CreateResponse(prompt)

        let chatHist = chat.map(mes => `${mes.role}: ${mes.content}`)
        chatHist = chatHist.join('\n') + '\nassistant: '

        const reqdata = JSON.stringify({
            prompt: chatHist,

            max_new_tokens: 250,
            stopping_strings: ['user:', 'assistant:', 'system:', 'User:', 'Assistant:', 'System:'],
            add_bos_token: true,
            truncation_length: 2048,
            chat_prompt_size: 2048,
            early_stopping: true,
            skip_special_tokens: true,

            do_sample: true
        })

        if (streaming) {
            output.value = 'Starting streaming...';

            const socket = new WebSocket(streamEndpoint)
            let firstMessage = true
            socket.onopen = () => {
                socket.send(reqdata)
            }
            socket.onerror = (ev) => {
                output.value = 'Something went wrong!'
                console.log(ev)
                document.running = false
            }
            socket.onmessage = (ev) => {
                const data = JSON.parse(ev.data)
                switch (data.event) {
                    case 'text_stream':
                        if (firstMessage) {
                            firstMessage = false
                            output.value = ''
                        }
                        output.value += data.text
                        console.log(data.text)
                        break
                    case 'stream_end':
                        socket.close()
                        document.running = false
                        return
                }
            }
        }
        else {
            output.value = 'Generating prompt... Please wait.'
            fetch(blockingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: reqdata
            })
                .then(r => r.json())
                .then(data => {
                    output.value = data?.results?.[0]?.text ?? `Something went wrong!`
                    console.log(data)
                    document.running = false
                })
                .catch(e => {
                    output.value = 'Something went wrong!'
                    console.log(e)
                    document.running = false
                })
        }
    }

    /**
     * @param prompt {string}
     * @param output {HTMLInputElement}
     */
    static generate(prompt, output) {
        try {
            document.running = true
            switch (document.data.provider) {
                case 'openai':
                    this.openAI(prompt, output)
                    break
                case 'oobabooga':
                    this.oobabooga(prompt, output)
                    break
            }
        }
        catch {
            document.running = false
        }
    }

    static stopStream() {
        switch (document.data.provider) {
            case 'oobabooga':
                fetch(document.data.textgenwebuiendpoint + '/v1/stop-stream', {
                    method: 'POST',
                    body: '{}'
                })
                document.running = false
                break
        }
    }
}
