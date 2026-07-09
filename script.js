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
// --- לוגיקת פופ-אפ מלאי אזל ---
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    const stockModal = document.getElementById('stock-modal');
    const closeX = document.querySelector('.modal-close');
    const closeBtn = document.getElementById('modal-close-btn');

    // פתיחת הפופ-אפ לכל הכפתורים
    if (checkoutBtns.length > 0 && stockModal) {
        checkoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                stockModal.classList.add('active');
            });
        });
    }

    // פונקציית סגירה
    const closeModal = () => {
        stockModal.classList.remove('active');
    };

    // סגירה בלחיצה על ה-X או על כפתור הסגירה
    closeX?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);

    // סגירה בלחיצה מחוץ לכרטיס (על הרקע הכהה)
    stockModal?.addEventListener('click', (e) => {
        if (e.target === stockModal) {
            closeModal();
        }
    });
});
// הפעלה ראשונית למקרה שחלק מהאלמנטים כבר נראים בעת הטעינה
reveal();
