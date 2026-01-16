export default function AdminDashboard() {
  return (
         <div className="text-center mt-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
               Admin Dashboard page
            </h1>
            <p className="text-gray-600">
                Only logged-in users should see this.
            </p>
        </div>
  );
}
