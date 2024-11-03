document.addEventListener('DOMContentLoaded', () => {
    const items_carrusel = document.querySelectorAll('.carousel');
    M.Carousel.init(items_carrusel, {
        duration: 150,
        dist: 15,
        shift: 5,
        padding: 5,
        numVisible: 10,
    });
})