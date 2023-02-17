import {PsychTest, Disorder, Symptom} from "./psychtest.js";

// Symptoms
// PPD
const paranoidOfLies = new Symptom("I think other people are using me, lying to me, or harming me without evidence.",)
const doubtsTrustworthy = new Symptom("I doubt the loyalty or trustworthiness of others.")
const noConfide = new Symptom("I will not confide in others because they will betray me.")
const misinterpretHarmful = new Symptom("I often misinterpret harmless gestures as hurtful or threatening.")
const holdGrudges = new Symptom("I hold grudges.", "I will stay angry at someone for a long time.")
const identityAttacked = new Symptom("I believe my reputation and character are being assailed (attacked) by others.")
const jealousSuspicious = new Symptom("I often believe my intimate partners are cheating on me without evidence.")

// SzPD
const dislikeRelationships = new Symptom("I don't want nor enjoy close relationships.")
const independentactivities = new Symptom("I almost always choose independent activities.")
const noSexualInterest = new Symptom("I have little to no interest in becoming sexually active with another person.")
const noPleasure = new Symptom("I don't enjoy many or all activities.")
const lackCloseFriends = new Symptom("I lack close friends other than immediate relatives (family members).")
const unmovedByPraise = new Symptom("I don't feel anything when I'm praised or criticised.")
const emotionalDetachment = new Symptom("I feel emotionally detached (little to no emotions)./Other people say i'm cold.")

// StPD
const ideasOfReference = new Symptom("I believe things are connected where other people think they are not.", "",
    ["Everybody is talking about me.", "News headlines were written specifically for/about me.", "Lyrics in music are about me."])
const magicalThinking = new Symptom("I believe things that other people think are nonsense.", "",
    ["I am superstitious", "I believe in clairvoyance", "I believe in telepathy", "I believe in a sixth sense"])
const illusions = new Symptom("I experience unusual perceptual experiences.", "",
    ["I see my body in a different shape than it actually is.", "I see shapes move when they are actually not moving."])
const oddThinkingSpeech = new Symptom("People think i speak oddly.", "",
    ["People say i speak vaguely", "People say my speech is circumstantial", "People say my speech uses too many metaphors", "People say my speech is overelaborate", "People say my speech is stereotyped"])
// paranoidOfLies
const inappropriateOrConstrictedAffect = new Symptom("I often show the wrong/weak emotions on my face.", "",
    ["I show the wrong emotions on my face according to others.", "I show little to no emotions on my face according to others."])
const oddBehavior = new Symptom("People describe my behavior as odd, eccentric, or peculiar")
// lackCloseFriends
const extremeSocialAnxiety = new Symptom("I have social anxiety which does not go away when i get to know someone.", "This social anxiety is linked to fears of others and not low self esteem.")

// ASPD
const disregardOfOthers = new Symptom("I match one of the examples.", "",
    ["I disobey laws which would warrant arrest if broken.", "I lie, decieve or manipulate for profit or enjoyment", "I engage in dangerous impulsive behavior", "I am easily irritated and get aggressive easily, i start fights and attack people.",
    "I disregard the safety of myself and/or others.", "I frequently engage in irresponsible behavior", "I do not have any remorse for my actions."])
const age18 = new Symptom("I am of age 18 or above.")
const conductDisorderBefore15 = new Symptom("I engaged in the things listed below frequently and persistently before age 15", "",
    ["Stealing", "Lying", "Violence which may lead to destruction", "Reckless breaking of rules"])
const noSZ = new Symptom("I do not have Schizophrenia or Bipolar disorder.")

// BPD
const chronicEmpty = new Symptom("I have a chronic (long lasting) feeling of emptiness.")
const emotionalInstability = new Symptom("I am emotionally unstable.", "I feel emotions stronger than others. And my emotions last longer.")
const avoidAbandonment = new Symptom("I will frantically attempt to avoid abandonment.", "",
    ["I will threaten to commit suicide to prevent someone from leaving me."])
const identityDisturbance = new Symptom("I have an unstable self image or sense of self.", "",
    ["I do not know what my values or beliefs are.", "I do not know who i am as a person.", "I do not know my goals."])
const impulsivity = new Symptom("I am impulsive in at least 2 (two) of the listed examples", "",
    ["spending", "sex", "substance (drug) abuse", "reckless driving", "binge eating"])
const inappropriateAnger = new Symptom("I can get extremely angry, and have little to no control over this anger.", "",
    ["I get angry quickly.", "I am constantly angry.", "I fight frequently due to my anger."])
const splitting = new Symptom("I have issues in my relationships with other people due to me frequently seeing people as all good or all bad.", "",
    ["I idealise people, i see them as basically perfect.", "I devalue people, i see them as horrible people and i hate them."])
const suicidal = new Symptom("I recurrently engage in suicidal behavior, perform suicidal gestures, threaten to commit suicide, or engage in self-harm.")
const stressParanoia = new Symptom("I become paranoid or dissociate severely when under stress.")

// HPD
const centerOfAttention = new Symptom("I feel the need to be the center of attention, and feel uncomfortable if I'm not.")
const seductive = new Symptom("I engage in sexual, seductive or provocative behavior when interacting with other people.")
const shallowEmotions = new Symptom("I experience shallow, but rapidly shifting emotions.")
const physicalAppearance = new Symptom("I use my physical appearance to draw the attention of others.")
const dramaticSpeech = new Symptom("Others consider my speech dramatic and vague, lacking detail.")
const exaggeratedExpression = new Symptom("I exaggerate my emotions.")
const easilyInfluence = new Symptom("I am easily influenced by others or situations.")
const notAsIntimate = new Symptom("I often assume relationships are more intimate than they actually are.")

// NPD
const grandioseSelfImportance = new Symptom("I believe i am very important.", "",
    ["I exaggerate my achievements to make them seem bigger", "I expect to be recognised as superior to others."])
const successFantasies = new Symptom("I have fantasies about unlimited success, power, brilliance, beauty or ideal love")
const imSpecial = new Symptom("I believe i am special and can only be understood by or associate myself with other special or high-status people, or institutions")
const reqAdmiration = new Symptom("I need to be admired a lot.")
const entitlement = new Symptom("I expect people to follow my instructions, and I expect them to treat me better than they actually want to.")
const interpExploitational = new Symptom("I take advantage of others to achieve my goals.")
const lackEmpathy = new Symptom("I do not recognise or identify with the feelings of others.")
const envious = new Symptom("I feel envy towards others./I believe others feel envy towards me.")
const arrogance = new Symptom("I believe i am superior to others and show this in my behavior.")

// AvPD
const avoidContact = new Symptom("I avoid situations where i interact with other people, because i fear being criticised, disapproved, or rejected.")
const onlyInvolveIfAcceptance = new Symptom("I will not get involved with people unless i'm sure that they are accepting of me.")
const intimateRestraint = new Symptom("I restrain myself within intimate relationships because of fears of shame or ridicule.")
const fearOfCriticism = new Symptom("I am preoccupied with fears of receiving criticism or rejection in social situations.")
const feelsInadequate = new Symptom("I am inhibited in social situations because i feel like i'm inadequate.")
const feelsInferior = new Symptom("I consider myself inferior to others, socially inept or personally unappealing.")
const avoidRisks = new Symptom("I am reluctant to take personal risks or engage in new activities, because it may be embarrassing.")

// DPD
const clingyBehavior = new Symptom("I feel a need to be taken care of, I engage in clingy, needy behavior due to fear of abandonment.", "",
    ["I struggle with routine decisions without input, reassurance or advise from others.", "I need others to assume responsibilities which I should be attending to.",
        "I fear disagreeing with others, or I fear disapproval from others.", "I struggle to start with a project without support from others.",
        "I have an excessive need for support from others, even allowing others to force me to do thing rather than risking rejection or disapproval.",
        "I feel vulnerable or helpless when i'm alone.", "I desperately search for another relationship when my previous one ends.",
        "I fear an extreme amount about being left alone and being unable to care for myself."])

// OCPD
const detailsRulesEtc = new Symptom("I am preoccupied with details, rules, schedules, organization and lists.")
const tooMuchPerfectionism = new Symptom("I am too much of a perfectionist, it interferes with the completion of my task.")
const workDevotion = new Symptom("I am excessively devoted to my work and productivity, resulting in very little free time.")
const perfectionism = new Symptom("I am excessively perfectionistic, I am also inflexible regarding ethical and moral issues and values.")
const dontThrowOut = new Symptom("I do not want to throw away worn-out or worthless objects, even if they have no sentimental value to me.")
const issuesWorkingTogether = new Symptom("I am reluctant to give work to or work with others, unless they agree to do things exactly the way I want.")
const spending = new Symptom("I don't see money as something to be saved for the future.")
const stubborn = new Symptom("Other people tell me i'm stubborn and rigid in my opinions, I am not easily convinced to change them.")


// Disorders
// Cluster A
const PPD = new Disorder("Paranoid personality disorder", "characterized by paranoid delusions, and a pervasive, long-standing suspiciousness and generalized mistrust of others.",
    4, [paranoidOfLies, doubtsTrustworthy, noConfide, misinterpretHarmful, holdGrudges, identityAttacked, jealousSuspicious])
const SzPD = new Disorder("Schizoid personality disorder", "characterized by a lack of interest in social relationships, a tendency toward a solitary or sheltered life style, secretiveness, emotional coldness, detachment, and apathy.",
    4, [dislikeRelationships, independentactivities, noSexualInterest, noPleasure, lackCloseFriends, unmovedByPraise, emotionalDetachment])
const StPD = new Disorder("Schizotypal personality disorder", "characterized by thought disorder, paranoia, a characteristic form of social anxiety, derealization, transient psychosis, and unconventional beliefs.",
    5, [ideasOfReference, magicalThinking, illusions, oddThinkingSpeech, paranoidOfLies, inappropriateOrConstrictedAffect, oddBehavior, lackCloseFriends, extremeSocialAnxiety])

// Cluster B
const ASPD = new Disorder("Antisocial personality disorder", "characterized by a long-term pattern of disregard of, or violation of, the rights of others as well as a difficulty sustaining long-term relationships.",
    4, [disregardOfOthers, age18, conductDisorderBefore15, noSZ])
const BPD = new Disorder("Borderline personality disorder/Emotionally unstable personality disorder", "characterized by a long-term pattern of unstable interpersonal relationships, distorted sense of self, and strong emotional reactions.",
    5, [chronicEmpty, emotionalInstability, avoidAbandonment, identityDisturbance, impulsivity, inappropriateAnger, splitting, suicidal, stressParanoia])
const HPD = new Disorder("Histrionic personality disorder", "characterized by a pattern of excessive attention-seeking behaviors, usually beginning in early childhood, including inappropriate seduction and an excessive desire for approval.",
    5, [centerOfAttention, seductive, shallowEmotions, physicalAppearance, dramaticSpeech, exaggeratedExpression, easilyInfluence, notAsIntimate])
const NPD = new Disorder("Narcissistic personality disorder", "characterized by a life-long pattern of exaggerated feelings of self-importance, an excessive need for admiration, a diminished ability or unwillingness to empathize with others' feelings, and interpersonally exploitative behavior.",
    5, [grandioseSelfImportance, successFantasies, imSpecial, reqAdmiration, entitlement, interpExploitational, lackEmpathy, envious, arrogance])

// Cluster C
const AvPD = new Disorder("Avoidant personality disorder", "characterized by excessive social anxiety and inhibition, fear of intimacy (despite an intense desire for it), severe feelings of inadequacy and inferiority, and an overreliance on avoidance of feared stimuli (e.g. self-imposed social isolation) as a maladaptive coping method.",
    4, [avoidContact, onlyInvolveIfAcceptance, intimateRestraint, fearOfCriticism, feelsInadequate, feelsInferior, avoidRisks])
const DPD = new Disorder("Dependent personality disorder", "characterized by a pervasive psychological dependence on other people.",
    1, [clingyBehavior])
const OCPD = new Disorder("Obsessive–compulsive personality disorder", "marked by an excessive need for orderliness and neatness.",
    4, [detailsRulesEtc, tooMuchPerfectionism, workDevotion, perfectionism, dontThrowOut, issuesWorkingTogether, spending, stubborn])

const test = new PsychTest("Personality disorders", "A test which tests for personality disorders in cluster A, B and C",
    [paranoidOfLies, doubtsTrustworthy, noConfide, misinterpretHarmful, holdGrudges, identityAttacked, jealousSuspicious, dislikeRelationships,
        independentactivities, noSexualInterest, noPleasure, lackCloseFriends, unmovedByPraise, emotionalDetachment, ideasOfReference, magicalThinking, illusions,
        oddThinkingSpeech, inappropriateOrConstrictedAffect, oddBehavior, extremeSocialAnxiety, disregardOfOthers, age18, conductDisorderBefore15, noSZ,
        chronicEmpty, emotionalInstability, avoidAbandonment, identityDisturbance, impulsivity, inappropriateAnger, splitting, suicidal, stressParanoia,
        centerOfAttention, seductive, shallowEmotions, physicalAppearance, dramaticSpeech, exaggeratedExpression, easilyInfluence, notAsIntimate, grandioseSelfImportance,
        successFantasies, imSpecial, reqAdmiration, entitlement, interpExploitational, lackEmpathy, envious, arrogance, avoidContact, onlyInvolveIfAcceptance,
        intimateRestraint, fearOfCriticism, feelsInadequate, feelsInferior, avoidRisks, clingyBehavior, detailsRulesEtc, tooMuchPerfectionism, workDevotion,
        perfectionism, dontThrowOut, issuesWorkingTogether, spending, stubborn],
    [PPD, SzPD, StPD, ASPD, BPD, HPD, NPD, AvPD, DPD, OCPD])

function pdTestStart(parentEl) {
    test.start(parentEl)
}

export {pdTestStart}