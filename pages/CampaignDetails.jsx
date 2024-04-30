import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, LineChart} from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import { UserData } from "../Data";
import "../App.css";


const CampaignDetails = () => {

    const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Amount Collected",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, deleteCampaigns, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = Math.abs(daysLeft(state.deadline));

const fetchDonators = async () => {
    // Initialize an object to store total donations for each day
    const dailyTotalDonations = {};

    // Fetch donations for the specific campaign
    const data = await getDonations(state.pId);

    // Iterate over each donation
    data.forEach((item) => {

      const date = item.date;

      if (!dailyTotalDonations[date]) {
            dailyTotalDonations[date] = 0;
        }

        // Add the donation amount to the total for this date
        dailyTotalDonations[date] += parseFloat(item.donation);

    });

    // Extract labels (dates) and donation amounts for each day
    const labels = Object.keys(dailyTotalDonations);
    const donationAmounts = Object.values(dailyTotalDonations);

    // Update the LineChart data
    setUserData((prevState) => ({
        ...prevState,
        labels: labels,
        datasets: [
            {
                ...prevState.datasets[0],
                data: donationAmounts,
            },
        ],
    }));

    // Log the total donations for each day
    console.log(dailyTotalDonations);

    // Set the donators state with the donation data
    setDonators(data);
};




    const confirmDeleteCampaign = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this campaign?");
    
    if (userConfirmed) {
      try {
        setIsLoading(true);

        await deleteCampaigns(state.pId);
            
        setIsLoading(false);

        console.log("Delete Successfully")
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);
  const donorName = name.length === 0 ? address : name;

  if (amount.length === 0 || isNaN(amount)) {
    alert("Invalid number");
    setIsLoading(false);
    return;
  }

  const data = await donate(state.pId, amount, donorName, new Date().getTime());
  console.log(data);
  console.log(data.gasUsed);
  console.log(data.receipt.transactionHash);

  navigate('/transaction', { state: data });
  setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amtCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify mr-[40px]">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] mr-[40px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                )}

                <button 
                  className="h-10 px-5 text-red-700 transition-colors duration-150 border border-red-500 rounded-lg focus:shadow-outline hover:bg-red-600 hover:text-indigo-100"
                  onClick={confirmDeleteCampaign}
                >
                  Delete Campaign
                </button>
                
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">

              <div className='pb-3'>
              <input 
                type="string"
                placeholder="Enter your name (Optional)"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              </div>
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
        <div style={{ marginTop: '30px' }}>
          <h4 className="font-epilogue font-semibold text-[18px] uppercase" style={{ color: '#5DEBD7' }}>Amount collected on a daily basis</h4>
        </div>
        <div style={{ width: 700 }}>
            <LineChart chartData={userData} />
        </div>
    </div>
  )
}

export default CampaignDetails