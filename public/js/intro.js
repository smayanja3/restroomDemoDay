/* ============================================================
   GOT2GO INTRO: scroll-driven animation with GSAP + ScrollTrigger
   Adapted from "Istanbul — GSAP ScrollTrigger" by Mert Cukuren (MIT License)
   https://codepen.io/knyttneve/pen/zYrZwVo
   ============================================================ */

(function () {
    const root = document.documentElement

    // skip the intro if: the user turned motion off, OR GSAP didn't load (e.g. no Wi-Fi)
    if (root.classList.contains('noIntro') || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        root.classList.add('noIntro')
        return
    }

    gsap.registerPlugin(ScrollTrigger)
    document.body.classList.add('introActive')   // hides the bottom nav, shows "Skip intro"

    const paths = document.querySelectorAll('.bostonMap path')
    const highlight = '#downtown'                 // the neighborhood that turns green

    // every outline starts "undrawn": a dash as long as the outline, pushed off by that same length
    paths.forEach((path) => {
        const length = path.getTotalLength()
        path.style.strokeDasharray = length
        path.style.strokeDashoffset = length
    })

    // the steps of the intro, in order. Scrolling moves through them.
    const intro = gsap.timeline()

    intro
        // 1. the title slides away, the scroll hint fades
        .to('.introTitle span', { x: 100, opacity: 0, stagger: 0.3, duration: 2 }, 'start')
        .to('.introScroll', { y: 50, opacity: 0, duration: 2 }, 'start')

        // 2. the map slides in and each neighborhood draws its outline
        .from('.bostonMap', { x: -100, opacity: 0, duration: 2 }, 'start+=0.2')
        .to(paths, { strokeDashoffset: 0, fill: 'rgba(255, 255, 255, 0.03)', stagger: 0.08, duration: 3 }, 'start+=0.5')

        // 3. Downtown fills green, the rest dims, GOT2GO rises letter by letter
        .to(highlight, { fill: '#1A7F4B', stroke: '#3DBE7A', duration: 2 }, 'city')
        .to('.bostonMap path:not(#downtown)', { opacity: 0.4, duration: 2 }, 'city')
        .to('.introText span', { y: 0, opacity: 1, stagger: 0.25, duration: 1.5 }, 'city-=0.15')
        .to('.introTag', { y: 0, opacity: 1, duration: 1.5 }, '>-0.5')

        // 4. everything fades back so the landing page can take over
        .to('.introStage', { opacity: 0, scale: 0.92, duration: 2 }, '+=1')

    // tie the timeline to scrolling
    ScrollTrigger.create({
        animation: intro,
        trigger: '.introWrap',
        start: 'top top',     // starts when the intro hits the top of the screen
        end: '+=250%',        // lasts 2.5 screens of scrolling
        scrub: 1.2,           // follows your scroll, with a little smoothing
        pin: true,            // holds the intro in place while it plays
        onLeave: () => document.body.classList.remove('introActive'),
        onEnterBack: () => document.body.classList.add('introActive'),
    })
})()
