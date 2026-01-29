export default function Footer () {

    return (
        <footer className="bg-gray-800 text-white py-4 mt-8 border-t border-gray-700">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Product Zone. All rights reserved.</p>
            </div>
        </footer>
    )
}