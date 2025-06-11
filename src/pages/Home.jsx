import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold">Bienvenue à HotelParadise</h1>
      <p className="mt-4">Commencez votre séjour en ligne :</p>
      <Link to="/checkin" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Faire le check-in
      </Link>
    </div>
  );
}
