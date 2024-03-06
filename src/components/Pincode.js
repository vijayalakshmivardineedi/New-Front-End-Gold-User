import React, { useState, useEffect } from 'react';
import './Pincode.css';
import { MdLocationPin ,MdMyLocation } from "react-icons/md";
const Pincode = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const checkPincode = () => {
    const isTelanganaOrAndhraPradesh =
    pincode.startsWith('50') || // Telangana
    pincode.startsWith('51') || // Andhra Pradesh
    pincode.startsWith('52') || // Andhra Pradesh
    pincode.startsWith('53');   // Andhra Pradesh

  if (isTelanganaOrAndhraPradesh) {
    setResult('Order can be Delivered within 2 days');
  } else {
    setResult(`Cannot Deliver to this Pincode ${pincode}`);
  }
};

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
         
          if (data.address) {
            const areaResult = data.address.suburb || data.address.village || data.address.town || 'Area not available';
            const districtResult = data.address.state_district || 'District not available';
            const pinResult = data.address.postcode || 'Pincode not available';
            setArea(areaResult);
            setCity(districtResult); // Set the district instead of the city
            setPincode(`${pinResult}`);
          } else {
            setPincode('Address details not available');
          }
        })
        .catch((error) => {
          console.error('Error fetching address details:', error);
        });
    }
  }, [userLocation]);

  return (
    <div>


      <div className="boxed-text fs-4">
        
        <input
          type="text"
          className="updatebtn"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button className="pincodebtn" onClick={checkPincode}>
          Submit
        </button>
        <button className="locationbtn" onClick={getLiveLocation}>
        <MdMyLocation /> Locate Me
        </button>
      </div>
      <div>
      {userLocation && (
          <>
            <p className='location-details fs-3 fw-3'><MdLocationPin/>{area}, {city}- {pincode}</p>
          </>
        )}
        <p className="pincode-info fs-3">{result}</p>
        
      </div>
    </div>
  );
};

export default Pincode;
