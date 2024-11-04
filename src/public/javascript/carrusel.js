document.addEventListener('DOMContentLoaded', () => {
    const items_carrusel = document.querySelectorAll('.carousel');
    M.Carousel.init(items_carrusel, {
        duration: 150,
        dist: 0,
        shift: 5,
        padding: 50,
        numVisible: 10,
    });
})