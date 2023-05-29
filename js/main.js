const url1LongLink = document.querySelectorAll('.url1LongLink')
const urlinput = document.querySelector('#urlText')
const shortItBtn = document.querySelector('.shortItBtn')
const urlContainer = document.querySelector('.urlContainer')
const error = document.querySelector('.error')
const invalidUrl = document.querySelector('.invalidUrl')
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);
const navlinks = document.querySelector('.navlinks')
const navToggler = document.querySelector('.navToggler')
const html = document.querySelector("html")
const loading = document.getElementById("loading")
const shortenItText = document.querySelector('.shortenItText')


async function getLink(){
    shortenItText.style.display = "none"
    loading.style.display = "block"
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlinput.value}`)
    const data = await res.json();

    if(data){
        shortenItText.style.display = "block"
        loading.style.display = "none"
    }
    console.log(data)
    return data
}


urlContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains('copy')){
        const copyLink = document.getElementById("linkId");
        navigator.clipboard.writeText(copyLink.textContent);
        let cpyBtn = e.target
        cpyBtn.style.backgroundColor = "var(--Dark-Violet)"
        cpyBtn.textContent = "Copied!"
    }
})


shortItBtn.addEventListener('click', async function(e){
    e.preventDefault()
    if(urlinput.value === ""){
        error.style.display = "block"
        urlinput.style.border = "3px solid var(--Red)"
        urlinput.classList.add('placeHolderError')
        setTimeout(() => {
            error.style.display = "none"
            urlinput.style.border = "2px solid transparent"
            urlinput.classList.remove('placeHolderError')
        },3500)
    }else if(!urlinput.value.match(regex)){
        invalidUrl.style.display = "block"
        urlinput.style.border = "3px solid var(--Red)"
        urlinput.classList.add('placeHolderError')
        setTimeout(() => {
            invalidUrl.style.display = "none"
            urlinput.style.border = "2px solid transparent"
            urlinput.classList.remove('placeHolderError')
        },3500)
    } else{
        const link = await getLink()
        console.log(link)
        const div = document.createElement('div')
        div.innerHTML = `
            <h3 class="url1LongLink">https://${urlinput.value}</h3>
            <div>
                <a href="https://${link.result.short_link}" target="_blank" id="linkId" class="url1ShortLink">https://${link.result.short_link}</a>
                <button class="copy">Copy</button>
            </div>
        `
        div.classList.add('url')
        urlContainer.appendChild(div)
        urlinput.value = ""
        // urlLink.textContent = `https://${urlinput.value}`
    }
})


function navOpen(){
    navlinks.style.top = navlinks.style.top === "9%" ? "-9%" : "9%"
    navToggler.classList.toggle('open')
    html.style.overflowY = html.style.overflowY === "hidden" ? "scroll" : "hidden"
}


AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
