export const analysisSteps = ['Analyzing supply', 'Analyzing market demand', 'Forecasting demand', 'Finding buyers', 'Checking FPO supply', 'Optimizing logistics', 'Generating recommendation'];
export function runDemoAnalysis(setState, currentState) { return new Promise(resolve => setTimeout(() => { setState({ ...currentState, found: true }); resolve(); }, 2500)); }
