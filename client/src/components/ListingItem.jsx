import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { makeLakhs } from '../utils/makeLakhs';
import { FaBath, FaBed } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-blue-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <div className='text-slate-700 flex gap-12 '>
            <div className='font-bold text-xs flex items-center gap-1 ml-2'>
              
              <FaBed className='h-4 w-4 text-green-700' />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs flex items-center gap-1'>
              <FaBath className='h-4 w-4 text-green-700' />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
          <div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
        
          <p className='text-slate-500 mt-2 font-semibold text-center'>
            Rs &nbsp;
            {listing.offer
              ? makeLakhs(listing.discountPrice)
              : makeLakhs(listing.regularPrice)}
            {listing.type === 'rent' && ' / month'}
          </p>
          </div>
        
        </div>
        <br />
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    offer: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['rent', 'sale']).isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};
