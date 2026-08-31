import { useNavigate } from "react-router-dom";

const categories = [
    {
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1493200754321-b1d3cbc969a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Shoes",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHNob2VzfGVufDB8fDB8fHww"
    },
    {
        name: "Watches",
        image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXR5fGVufDB8fDB8fHww"
    },
    {
        name: "Home",
        image: "https://plus.unsplash.com/premium_photo-1729431432431-fabe5caa7078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVmcmlncmF0b3JzfGVufDB8fDB8fHww"
    }
];


export default function Categories() {
    const navigate = useNavigate();
    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
            <div key={categories.name} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {
                    categories.map((category) => {
                        return (
                            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer" onClick={() => navigate(`/products?category=${category.name}`)}>
                                <img src={category.image} alt={category.name} className="h-40 w-full object-cover" />
                                <div className="p-4 text-center font-semibold">{category.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}