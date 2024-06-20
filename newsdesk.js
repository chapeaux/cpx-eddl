let evtName = 'cpx-report';
const seed = new Uint32Array(1);
const rng = crypto.getRandomValues(seed).join('');
const src = document.querySelector(`script[src*='${(new URL(import.meta.url)).pathname}']:not(#_${rng})`);
if (import.meta.url) {
    if (src instanceof HTMLElement) {
        evtName = src.getAttribute('data-event') ?? evtName;
        src.id = `_${rng}`;
    }
}
globalThis.appEventData = globalThis.appEventData || [];
export const Newsdesk = {
    handleEvent(event) {
        const details = event.toJSON();
        globalThis.appEventData.push(details);
        globalThis.dispatchEvent(new CustomEvent('newsflash', {
            composed: true,
            bubbles: true,
            detail: details
        }));
    }
};
globalThis.addEventListener(evtName, Newsdesk);
