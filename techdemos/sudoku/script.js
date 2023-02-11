import {solve} from "./solver.js";

const solveButton = document.getElementById("solveButton")
const input = document.getElementById("input")
const output = document.getElementById("output")
const steps = document.getElementById("steps")

// Set input to example input
input.value = `000260701
680070090
190004500
820100040
004602900
050003028
009300074
040050036
703018000`

solveButton.addEventListener("click", e => {
    const start = performance.now()
    output.value = `${solve(input.value, steps.value)}\nIt took ${performance.now() - start}ms`
})