const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((element) => revealObserver.observe(element));

const tiltCards = document.querySelectorAll('.card-tilt');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

const testimonials = Array.from(document.querySelectorAll('.review-card'));
const prevButton = document.querySelector('.testimonial-nav.prev');
const nextButton = document.querySelector('.testimonial-nav.next');
let currentIndex = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextTestimonial() {
  showTestimonial((currentIndex + 1) % testimonials.length);
}

function prevTestimonial() {
  showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
}

function startAutoRotate() {
  if (testimonials.length < 2) return;
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 6500);
}

if (testimonials.length) {
  showTestimonial(0);
  startAutoRotate();

  nextButton?.addEventListener('click', () => {
    nextTestimonial();
    startAutoRotate();
  });

  prevButton?.addEventListener('click', () => {
    prevTestimonial();
    startAutoRotate();
  });
}
