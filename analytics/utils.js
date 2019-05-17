import {GoogleAnalyticsSettings,  GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import gaRouteMap from "gaRouteMap/config.js";

GoogleAnalyticsSettings.setDryRun(false);


GoogleAnalyticsSettings.setDispatchInterval(parseInt(Config.GA_TRACKER_INTERVAL));

export const tracker = new GoogleAnalyticsTracker(Config.GA_TRACKER_ID, {CD_A: 1, CD_B: 2});

let customDimensions = {
	CD_A: 'aaa',
	CD_B: 'bbb'
};

const setDimension = (dimension) => {
	customDimensions = {...customDimensions, ...dimension};
};


export const setAppName = appName => {
	tracker.setAppName(appName);
};

export const setAppVersion = appVersion => {
	tracker.setAppVersion(appVersion);
};

export const trackEvent =(category, action, optionalValues = {}) => {
	tracker.trackEventWithCutstomDimensionValues(category, action, optionalValues, customDimensions);
};

export const setTrackUncaughtExceptions = (enabled = true) => {
	tracker.setTrackUncaughtExceptions(enabled);
};

export const trackException = (error, fatal = false) => {
	tracker.trackException(error, fatal);
};

export const screenTrackingConfig = {
	tracker, 
	navStoreKey: 'nav',
	navActions: ['Navigation/NAVIGATE', 'Navigation/BACK', 'Navigation/RESET'],
	gaRouteMap,
	customDimensions
};
export const setUser = userId => {
	tracker.setUser(userId);
};

