'use strict';
document.documentElement.classList.add(`js`);
const menu = document.querySelector(`.menu`);
menu.addEventListener(`click`, () => {
    const expanded = menu.getAttribute(`aria-expanded`) === `true`;
    menu.setAttribute(`aria-expanded`, `${!expanded}`);
    document.querySelector(`#navigation`).classList.toggle(`open`, !expanded);
});
function readBest() {
    try {
        const value = Number(localStorage.getItem(`eightLeggedBest`));
        return Number.isInteger(value) && value >= 0 && value <= 5 ? value : 0;
    }
    catch {
        return 0;
    }
}
function saveBest(score) {
    try {
        localStorage.setItem(`eightLeggedBest`, `${score}`);
        return true;
    }
    catch {
        return false;
    }
}
const facts = [
    `Spiders use silk for more than catching food: it can protect eggs and line a retreat.`,
    `Wolf spider mothers carry their egg sacs attached to their spinnerets.`,
    `Jumping spiders use a silk safety line when moving and jumping.`,
    `Spiders are arachnids. Insects have six legs; adult spiders have eight.`,
    `A web carries vibrations that can help its owner locate prey.`
];
let factIndex = 0;
function showNextFact() {
    factIndex = (factIndex + 1) % facts.length;
    document.querySelector(`#fact`).textContent = `${facts[factIndex]}`;
}
document.querySelector(`#another-fact`)?.addEventListener(`click`, showNextFact);
const speciesCards = [...document.querySelectorAll(`#species-list .card`)];
function filterSpecies() {
    const term = document.querySelector(`#search`).value.trim().toLowerCase();
    const strategy = document.querySelector(`#strategy`).value;
    const matches = speciesCards.filter(card => {
        const visible = card.textContent.toLowerCase().includes(term) && (strategy === `all` || card.textContent.includes(strategy));
        card.hidden = !visible;
        return visible;
    });
    document.querySelector(`#result-count`).textContent = matches.length ? `${matches.length} ${matches.length === 1 ? `group` : `groups`} to explore` : `No matches. Try a different search or strategy.`;
}
document.querySelector(`#search`)?.addEventListener(`input`, filterSpecies);
document.querySelector(`#strategy`)?.addEventListener(`change`, filterSpecies);
const questions = [
    {
        question: `How many legs does an adult spider have?`, choices: [`Six`, `Eight`, `Ten`], answer: 1, why: `Spiders are arachnids and have eight legs. Insects have six.`
    },
    {
        question: `Which group uses large forward-facing eyes to judge a leap?`, choices: [`Jumping spiders`, `Orb-weavers`, `Tarantulas`], answer: 0, why: `Jumping spiders rely on keen vision to stalk and leap at prey.`
    },
    {
        question: `What can spider silk be used for?`, choices: [`Only catching insects`, `Only moving through the air`, `Protecting eggs and lining retreats`], answer: 2, why: `Silk has many uses beyond capture webs, including protecting eggs and lining a retreat.`
    },
    {
        question: `Where do wolf spider mothers carry their egg sacs?`, choices: [`Attached to their spinnerets`, `On a leaf above a web`, `Inside their mouth`], answer: 0, why: `Wolf spider females carry the sac attached to their spinnerets. Young later ride on the mother’s back.`
    },
    {
        question: `Which statement best describes spider hunting?`, choices: [`All spiders use orb webs`, `All spiders chase their prey`, `Different groups use different strategies`], answer: 2, why: `Spiders may trap, stalk, leap at or ambush prey. An aerial web is just one approach.`
    }
];
function renderQuiz() {
    document.querySelector(`#quiz-questions`).innerHTML = questions.map((item, index) => `<fieldset><legend>${index + 1}. ${item.question}</legend>${item.choices.map((choice, option) => `<label class="option"><input type="radio" name="q${index}" value="${option}" required> ${
        choice
    }</label>`).join(``)}<p class="feedback" id="feedback-${index}" hidden></p></fieldset>`).join(``);
    document.querySelector(`#best-score`).textContent = `Best score on this browser: ${readBest()} / ${questions.length}`;
}
function gradeQuiz(event) {
    event.preventDefault();
    const answers = new FormData(event.currentTarget);
    let score = 0;
    questions.forEach((item, index) => {
        const correct = Number(answers.get(`q${index}`)) === item.answer;
        if (correct) score += 1;
        const feedback = document.querySelector(`#feedback-${index}`);
        feedback.hidden = false;
        feedback.textContent = `${correct ? `Correct!` : `Keep exploring.`} ${item.why}`;
    });
    const best = Math.max(readBest(), score);
    const saved = saveBest(best);
    document.querySelector(`#best-score`).textContent = `Best score on this browser: ${best} / ${questions.length}${saved ? `` : ` (browser storage unavailable)`}`;
    const result = document.querySelector(`#quiz-result`);
    result.textContent = `You scored ${score} / ${questions.length}. ${score === questions.length ? `Excellent observation!` : `Read the explanations and try again.`}`;
    result.focus();
    event.currentTarget.querySelector(`button`).disabled = true;
    event.currentTarget.querySelectorAll(`input`).forEach(input => {
        input.disabled = true;
    });
    document.querySelector(`#retry`).hidden = false;
}
const quiz = document.querySelector(`#quiz-form`);
if (quiz) {
    renderQuiz();
    quiz.addEventListener(`submit`, gradeQuiz);
    document.querySelector(`#retry`).addEventListener(`click`, () => {
        renderQuiz();
        quiz.querySelector(`button`).disabled = false;
        document.querySelector(`#quiz-result`).textContent = ``;
        document.querySelector(`#retry`).hidden = true;
        quiz.querySelector(`input`).focus();
    });
}
document.querySelector(`#contact-form`)?.addEventListener(`submit`, event => {
    event.preventDefault();
    const name = document.querySelector(`#name`);
    const message = document.querySelector(`#message`);
    name.setCustomValidity(name.value.trim().length < 2 ? `Please enter at least two non-space characters.` : ``);
    message.setCustomValidity(message.value.trim().length < 10 ? `Please enter at least ten non-space characters.` : ``);
    if (!event.currentTarget.reportValidity()) return;
    document.querySelector(`#contact-result`).textContent = `Thank you, ${name.value.trim()}. Your demonstration message passed validation. Nothing was sent or stored.`;
    event.currentTarget.reset();
});
[`name`, `message`].forEach(id => document.getElementById(id)?.addEventListener(`input`, event => event.target.setCustomValidity(``)));
function useImageFallback(image) {
    image.removeAttribute(`srcset`);
    image.src = `${image.dataset.fallback}`;
    image.alt = `Stylised spider illustration; the photograph is unavailable.`;
}
document.querySelectorAll(`img[data-fallback]`).forEach(image => {
    image.addEventListener(`error`, () => useImageFallback(image), {
        once: true
    });
    if (image.complete && image.naturalWidth === 0) useImageFallback(image);
});
