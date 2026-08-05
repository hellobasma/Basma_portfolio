document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it becomes visible once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .reveal-text');
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Optional: Add a subtle parallax effect to the background blobs
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const blobs = document.querySelectorAll('.bg-blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});
