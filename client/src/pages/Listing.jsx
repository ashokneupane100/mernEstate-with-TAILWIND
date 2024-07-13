import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import numberToWords from "number-to-words";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false); // Initially false
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const convertToIndianCurrencyWords = (num) => {
    const crores = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const remainder = num % 100000;

    let result = "";
    if (crores > 0) result += `${numberToWords.toWords(crores)} Crores `;
    if (lakhs > 0) result += `${numberToWords.toWords(lakhs)} Lakhs `;
    if (remainder > 0) result += `and ${numberToWords.toWords(remainder)} `;

    return result.trim();
  };

  const handleSignInClick = () => {
    sessionStorage.setItem("redirectPath", location.pathname);
  };

  const handleContactClick = () => {
    setContact(true); // Set contact state to true when clicked
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
            }}
          >
            <FaShare className="text-slate-500" />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name}-Rs{" "}
              {listing.offer
                ? convertToIndianCurrencyWords(listing.discountPrice)
                : convertToIndianCurrencyWords(listing.regularPrice)}
              {listing.type === "rent" && " Per Month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="inline-block mr-2 text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  Rs{" "}
                  {(
                    +listing.regularPrice - listing.discountPrice
                  ).toLocaleString("en-IN")}{" "}
                  Discount
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Description- {""}
                {listing.description}
              </span>
            </p>
            <ul className=" text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : `${listing.bedrooms} Bedroom`}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : `${listing.bathrooms} Bathroom`}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking" : `No Parking`}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={handleContactClick} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                Contact LandLord
              </button>
            )}
            
            {contact && <Contact listing={listing}/>}

            {!currentUser && (
              <Link
                to={"/sign-in"}
                onClick={handleSignInClick}
                className="cursor-pointer"
              >
                <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mt-4">
                  Sign In to Contact the Landlord
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
