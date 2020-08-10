# Sequence detector

## Simple example

```js
const { createSequenceDetector, timeout } = require("sequence-detector");

const doubleClick = createSequenceDetector(["click", timeout(500), "click"]);

document.onclick = () => {
    if (doubleClick("click")) {
        concole.log("double click");
    }
};
```

## Using a Sequence Manager

```js
const {
    SequenceManager,
    timeout,
} = require("sequence-detector/sequence-manager");

const controlManager = new SequenceManager();

const run = ["ArrowRight", timeout(500), "ArrowRight"];

controlManager.add("run", run);
controlManager.add("specialAttack", [...run, "Space"]);

// ...

controlManager.on("run", () => {
    hero.run();
});
controlManager.on("specialAttack", () => {
    hero.specialAttack();
});
```
