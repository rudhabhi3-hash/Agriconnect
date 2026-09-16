import { analysisSteps } from '../services/aiService';
export default function LoadingAI() { return <div className="modal"><i>✦</i><label>AGRICONNECT AI AT WORK</label><h2>Building your best route to market</h2>{analysisSteps.map((step, index) => <p key={step} style={{ animationDelay: `${index * .3}s` }}>✓ {step}...</p>)}</div>; }
