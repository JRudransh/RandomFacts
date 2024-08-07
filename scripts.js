const texts = ["Please scroll down to see useless facts, This is the begenning"];
[1, 2, 3, 4].forEach((i) => {
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en").then((response) => {
        response.json().then((data) => {
            texts.push(data.text);
        })
    })
})
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;

    const textContainer = document.getElementById("text-container");

    const updateText = (index, animation) => {
        textContainer.classList.add("animate__animated", animation);
        textContainer.addEventListener('animationend', () => {
            textContainer.classList.remove("animate__animated", animation);
        }, { once: true });
        textContainer.innerHTML = texts[index];
    };

    const handleSwipe = (direction) => {
        let animation;
        if (direction === "up") {
            currentIndex = (currentIndex + 1) % texts.length;
            animation = "animate__slideInUp";
            if (currentIndex + 4 > texts.length) {
                fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en").then((response) => {
                    response.json().then((data) => {
                        texts.push(data.text);
                        console.log(data);
                    })
                })
            }

        } else if (direction === "down") {
            currentIndex = (currentIndex - 1 + texts.length) % texts.length;
            animation = "animate__slideInDown";
        } else if (direction === "left") {
            alert("Marked as done");
            return;
        } else if (direction === "right") {
            alert("Saved");
            return;
        }
        updateText(currentIndex, animation);
    };

    const hammer = new Hammer(document.getElementById("app"));
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipeup", () => handleSwipe("up"));
    hammer.on("swipedown", () => handleSwipe("down"));
    hammer.on("swipeleft", () => handleSwipe("left"));
    hammer.on("swiperight", () => handleSwipe("right"));

    updateText(currentIndex, "animate__slideInUp");
});
