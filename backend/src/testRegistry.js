import {
    FUNCTION_DECLARATIONS
} from "./tools/declarations.js";

import {
    TOOL_REGISTRY
} from "./tools/registry.js";

console.log("\n========== TOOL VALIDATION ==========\n");

const declaredTools = FUNCTION_DECLARATIONS.map(
    tool => tool.name
);

const registeredTools = Object.keys(TOOL_REGISTRY);

// Check that every declared tool has an implementation
for (const name of declaredTools) {
    if (typeof TOOL_REGISTRY[name] !== "function") {
        console.error(`MISSING IMPLEMENTATION: ${name}`);
    } else {
        console.log(`PASS: ${name}`);
    }
}

// Check for implementations without declarations
for (const name of registeredTools) {
    if (!declaredTools.includes(name)) {
        console.error(`UNDECLARED TOOL: ${name}`);
    }
}

console.log("\nDeclared:", declaredTools.length);
console.log("Registered:", registeredTools.length);

console.log("\n=====================================\n");