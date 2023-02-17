import {Test, TestButton, TestPage} from "./testlib.js";
import {pdTestStart} from "./pdtest.js";

const parentEl = document.getElementById("container")

new Test(parentEl, new TestPage("Tests", "These tests are not for self-diagnosing, they might have issues and inconsistencies, these tests were made to get a better view of issues you should probably get checked out.", [
    new TestButton("Acknowledge", "Accept that this test is not a diagnosis", e => {
        new TestPage("Pick a test", "Pick a test out of the possible options listed below", [
            new TestButton("Personality disorder test", "Test yourself for possible personality disorders.", e => pdTestStart(parentEl))
        ]).displayPage(parentEl)
    })
])).start()