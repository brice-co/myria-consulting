export interface ScenarioStep {
  speaker: 'agent' | 'caller' | 'system';
  text: string;
  delay: number; // ms before this step plays
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  type: '911' | '311' | 'orchestrator';
  icon: string;
  steps: ScenarioStep[];
}

export const scenarios: Scenario[] = [
  {
    id: 'fire-emergency',
    title: 'House Fire Emergency',
    description: 'A caller reports a house fire with people inside',
    type: '911',
    icon: '🔥',
    steps: [
      { speaker: 'agent', text: "911, what's your emergency?", delay: 500 },
      { speaker: 'caller', text: "There's a fire! My neighbor's house is on fire and I think someone is still inside!", delay: 3500 },
      { speaker: 'agent', text: "I understand, stay calm. Can you give me the exact address of the fire?", delay: 3000 },
      { speaker: 'caller', text: "It's 742 Maple Street, the two-story white house. There's smoke coming from the second floor windows.", delay: 3500 },
      { speaker: 'agent', text: "Thank you. I'm dispatching fire and rescue units to 742 Maple Street right now. Are you in a safe location away from the building?", delay: 4000 },
      { speaker: 'caller', text: "Yes, I'm across the street. I can see flames now coming from the roof. Please hurry!", delay: 3000 },
      { speaker: 'agent', text: "Units are on their way. Do you know how many people might be inside the house?", delay: 3000 },
      { speaker: 'caller', text: "I think there's a woman and two kids. I saw the husband leave for work this morning but I haven't seen anyone come out.", delay: 3500 },
      { speaker: 'agent', text: "Understood. I've noted that there may be three occupants. Do not attempt to enter the building. Fire and rescue are en route with an ETA of about 4 minutes. Can you see any exits they might use?", delay: 4500 },
      { speaker: 'caller', text: "The front door looks clear but there's a lot of smoke. Wait — I think I see someone at the window!", delay: 3000 },
      { speaker: 'agent', text: "If it's safe, try to get their attention and tell them to stay low and move to the nearest exit. Emergency services are on the way to your location. Please stay on the line if it's safe to do so. Stay calm and help will arrive shortly.", delay: 5000 },
    ],
  },
  {
    id: 'medical-emergency',
    title: 'Medical Emergency',
    description: 'A caller reports someone having a heart attack',
    type: '911',
    icon: '🚑',
    steps: [
      { speaker: 'agent', text: "911, what's your emergency?", delay: 500 },
      { speaker: 'caller', text: "My father just collapsed! He's clutching his chest and he can't breathe!", delay: 3500 },
      { speaker: 'agent', text: "I'm sending help right away. What is your address?", delay: 2500 },
      { speaker: 'caller', text: "We're at 1520 Oak Avenue, apartment 4B.", delay: 2500 },
      { speaker: 'agent', text: "Paramedics are being dispatched. Is your father conscious? Is he responsive?", delay: 3000 },
      { speaker: 'caller', text: "He's conscious but he's in a lot of pain. His face looks pale and he's sweating.", delay: 3000 },
      { speaker: 'agent', text: "Okay, these could be signs of a cardiac event. Help him lie down in a comfortable position. Is he on any medications?", delay: 3500 },
      { speaker: 'caller', text: "Yes, he takes blood pressure medication and he has aspirin in the cabinet.", delay: 3000 },
      { speaker: 'agent', text: "If he can swallow, give him one regular aspirin — have him chew it, don't swallow it whole. Loosen any tight clothing around his neck and chest. Do not give him anything else to eat or drink.", delay: 5000 },
      { speaker: 'caller', text: "Okay, I'm giving him the aspirin now. Is the ambulance close?", delay: 3000 },
      { speaker: 'agent', text: "Emergency services are on the way to your location. ETA is approximately 5 minutes. Keep him calm and still. If he becomes unconscious and stops breathing, I'll walk you through CPR. Please stay on the line if it's safe to do so. Stay calm and help will arrive shortly.", delay: 5500 },
    ],
  },
  {
    id: 'pothole-report',
    title: 'Pothole Report',
    description: 'A citizen reports a dangerous pothole on a busy road',
    type: '311',
    icon: '🕳️',
    steps: [
      { speaker: 'agent', text: "311 city services, how can I help you today?", delay: 500 },
      { speaker: 'caller', text: "Hi, I'd like to report a really bad pothole on my street. It's been getting worse and someone's going to damage their car.", delay: 3500 },
      { speaker: 'agent', text: "I'd be happy to help you report that. Can you tell me the exact location of the pothole?", delay: 3000 },
      { speaker: 'caller', text: "It's on Jefferson Boulevard, right between 5th and 6th Street, in the right lane heading northbound.", delay: 3000 },
      { speaker: 'agent', text: "Thank you. Can you describe the size of the pothole? Approximately how wide and deep would you say it is?", delay: 3000 },
      { speaker: 'caller', text: "It's probably about 2 feet wide and maybe 6 inches deep. It's right in the tire path so everyone has to swerve around it.", delay: 3500 },
      { speaker: 'agent', text: "I understand the concern. I'm creating a priority repair request for the Department of Public Works. Given the size and location, this would be classified as a high-priority repair.", delay: 4000 },
      { speaker: 'caller', text: "Great, how long does it usually take to get fixed?", delay: 2500 },
      { speaker: 'agent', text: "High-priority potholes are typically addressed within 48 to 72 hours. You'll receive a reference number for tracking. I've noted your request and it will be processed. Is there anything else I can help you with today? Have a great day!", delay: 5000 },
    ],
  },
  {
    id: 'noise-complaint',
    title: 'Noise Complaint',
    description: 'A resident files a noise complaint about construction',
    type: '311',
    icon: '🔊',
    steps: [
      { speaker: 'agent', text: "311 city services, how can I assist you today?", delay: 500 },
      { speaker: 'caller', text: "I want to file a noise complaint. There's a construction site next to my apartment that starts work at 5 AM every morning.", delay: 3500 },
      { speaker: 'agent', text: "I'm sorry to hear that. Can you provide the address of the construction site?", delay: 3000 },
      { speaker: 'caller', text: "It's on the corner of Main Street and 3rd Avenue. They're building a new apartment complex.", delay: 3000 },
      { speaker: 'agent', text: "Thank you. And what is your address? This helps us verify the proximity for the complaint.", delay: 3000 },
      { speaker: 'caller', text: "I live at 205 Main Street, apartment 12A. I'm right next door to the construction.", delay: 2500 },
      { speaker: 'agent', text: "According to city ordinances, construction noise is permitted between 7 AM and 6 PM on weekdays, and 9 AM to 5 PM on weekends. Work starting at 5 AM would be a violation.", delay: 4500 },
      { speaker: 'caller', text: "That's what I thought. It's been happening for two weeks now.", delay: 2500 },
      { speaker: 'agent', text: "I'm filing a formal noise ordinance violation complaint. An inspector will be assigned to investigate, typically within 24 to 48 hours. They may issue a citation to the construction company. I've noted your request and it will be processed. Is there anything else I can help you with today? Have a great day!", delay: 5500 },
    ],
  },
  {
    id: 'routing-emergency',
    title: 'Call Routing - Emergency',
    description: 'Orchestrator routes a caller to 911 for a car accident',
    type: 'orchestrator',
    icon: '🚗',
    steps: [
      { speaker: 'agent', text: "Emergency services. Do you need 911 for an emergency, or 311 for city services?", delay: 500 },
      { speaker: 'caller', text: "I just witnessed a car accident! Two cars collided at the intersection and someone looks hurt!", delay: 3500 },
      { speaker: 'agent', text: "I'm transferring you to emergency services right away.", delay: 2500 },
      { speaker: 'system', text: "--- Transferred to 911 ---", delay: 2000 },
      { speaker: 'agent', text: "911 emergency services, what is your emergency?", delay: 2000 },
      { speaker: 'caller', text: "There's been a car accident at the corner of Broadway and 12th. Two cars, head-on collision. One driver isn't moving.", delay: 3500 },
      { speaker: 'agent', text: "Emergency units are being dispatched to Broadway and 12th Street. Are you in a safe location?", delay: 3000 },
      { speaker: 'caller', text: "Yes, I'm on the sidewalk. There's broken glass everywhere and one car is smoking.", delay: 3000 },
      { speaker: 'agent', text: "Do not approach the vehicles, especially the one that's smoking. Can you tell if anyone else is injured?", delay: 3500 },
      { speaker: 'caller', text: "The other driver got out and is sitting on the curb. She looks shaken but she's conscious.", delay: 3000 },
      { speaker: 'agent', text: "Emergency services are on the way to your location. Fire, police, and EMS are all being dispatched. Please stay on the line if it's safe to do so. Stay calm and help will arrive shortly.", delay: 5000 },
    ],
  },
  {
    id: 'routing-services',
    title: 'Call Routing - City Services',
    description: 'Orchestrator routes a caller to 311 for a permit question',
    type: 'orchestrator',
    icon: '📋',
    steps: [
      { speaker: 'agent', text: "Emergency services. Do you need 911 for an emergency, or 311 for city services?", delay: 500 },
      { speaker: 'caller', text: "Hi, I have a question about getting a building permit for a fence in my backyard.", delay: 3000 },
      { speaker: 'agent', text: "Let me connect you with city services who can help.", delay: 2500 },
      { speaker: 'system', text: "--- Transferred to 311 ---", delay: 2000 },
      { speaker: 'agent', text: "311 city services, how can I assist you today?", delay: 2000 },
      { speaker: 'caller', text: "I want to build a 6-foot fence around my backyard. Do I need a permit?", delay: 3000 },
      { speaker: 'agent', text: "Yes, fences over 4 feet generally require a permit in most residential zones. Can you give me your property address so I can check your specific zoning requirements?", delay: 4000 },
      { speaker: 'caller', text: "Sure, it's 890 Cedar Lane.", delay: 2000 },
      { speaker: 'agent', text: "For that zone, a 6-foot fence does require a residential fence permit. The application fee is $75, and you can apply online or in person at City Hall. Processing takes about 5 to 10 business days. I've noted your request and it will be processed. Is there anything else I can help you with today? Have a great day!", delay: 6000 },
    ],
  },
];
