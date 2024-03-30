import React, { useContext } from 'react'
import AdHeader from './AdHeader'
import Chat from '../Chat/Chat'
import { adminChatRulesContext } from '../ContextAPI/AdminChatRuleResp'
import { Button } from '@mui/material'
import GavelIcon from "@mui/icons-material/Gavel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdContect() {
  const {adminChatRulesResp,setAdminChatRulesResp}=useContext(adminChatRulesContext)
  return (
    <>
    <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
    {adminChatRulesResp?
    <div className='flex justify-center items-center h-screen mt-80'>
         <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div className='flex justify-end items-end'>
           <Button onClick={()=>setAdminChatRulesResp(false)}>Back To Chat</Button>
          </div>
      <h2 className="text-2xl font-semibold mb-4">Rules for Chat Platform <GavelIcon color="info"/></h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">1. User Profile Identification:</h3>
        <p>The admin interface displays two types of profiles: logged-in user profiles and temporary (no longer) user profiles. Logged-in user profiles are identified by the user's profile picture, name, and user ID. Temporary user profiles are represented by a black background, with the name indicating the current date and time, serving as a unique identifier.</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">2. Profile Representation:</h3>
        <div className="ml-4">
          <h4 className="text-lg font-semibold mb-2">- Logged-in User Profile:</h4>
          <p>Profiles with a user's profile picture represent active, logged-in users. These users have permanent accounts on the website and can engage in persistent chat sessions. Their profile pictures correspond to their chosen avatar or image, and their identity is consistent across chat sessions.</p>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold mb-2">- Temporary (No Longer) User Profile:</h4>
          <p>Profiles with a black background signify temporary users who are currently engaged in the chat platform but do not have permanent accounts. These users are represented by the current date and time as their name, providing a unique identifier for the duration of their session. It's important to note that temporary user profiles are not permanent, and their chat history is not retained once they leave the platform or refresh the page.</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">3. Session Management:</h3>
        <div className="ml-4">
          <h4 className="text-lg font-semibold mb-2">- Logged-in User Sessions:</h4>
          <p>Admins can engage in persistent chat sessions with logged-in users. They can access previous messages exchanged with these users and maintain continuity in conversations across multiple visits.</p>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold mb-2">- Temporary User Sessions:</h4>
          <p>Admins should be aware that chat sessions with temporary users are transient and not persistent. Once a temporary user leaves the platform or refreshes the page, their chat history is not retrievable. Admins should prioritize addressing temporary user inquiries promptly within the context of their current session.</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">4. Communication Protocol:</h3>
        <p>Admins are expected to communicate professionally and courteously with all users, regardless of their profile type. They should provide assistance and support in accordance with the website's guidelines and policies. Admins should also be mindful of the temporary nature of interactions with no longer users and adjust their responses accordingly.</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">5. User Support and Assistance:</h3>
        <p>The admin interface serves as a hub for providing technical support and assistance to users. Admins should promptly respond to user queries, troubleshoot issues, and provide guidance as needed. They should utilize available resources and escalate complex matters to higher support tiers when necessary.</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">6. Privacy and Confidentiality:</h3>
        <p>Admins must uphold user privacy and confidentiality at all times. They should not disclose sensitive information or engage in unauthorized access to user accounts or data. Any breaches of privacy should be reported and addressed promptly by appropriate channels.</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">7. Training and Compliance:</h3>
        <p>Admins should receive proper training on chat platform protocols, privacy policies, and user management procedures. Regular compliance audits and updates should be conducted to ensure adherence to established guidelines and industry standards.</p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          By adhering to these rules and guidelines, admins can effectively manage the chat platform, provide quality support to users, and uphold the integrity of the website's services.
        </p>
      </div>
    </div>
    </div>
    :<Chat/>}
    </>
  )
}

export default AdContect