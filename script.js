// פונקציה לחשיפת אלמנטים בגלילה
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// --- לוגיקה לקרוסלת תמונות ---
let slideIndex = 1;
showSlides(slideIndex);

// פונקציה לכפתורי קדימה/אחורה
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// פונקציה לנקודות התחתונות
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // בדיקה שהאלמנטים קיימים לפני שמנסים להציג (למניעת שגיאות)
    if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active-dot";
    }
}
// הפעלה ראשונית למקרה שחלק מהאלמנטים כבר נראים בעת הטעינה
reveal();
