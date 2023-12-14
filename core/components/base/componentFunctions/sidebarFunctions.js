export function minimizeSidebar(obj,e) {
    e.preventDefault();
    
    let sidebar =  document.getElementById("sidebar");
    switch (true) {
        case (window.innerWidth < 768):
            sidebar.classList.toggle("-ml-[100%]")
            break;

        default:
            sidebar.classList.toggle("hidden")
            sidebar.classList.toggle("flex")
            break;
    }

} 
