
import { GestureDescription, Finger, FingerCurl, FingerDirection } from 'fingerpose';

export const thankYouSign = new GestureDescription('Thank You');

// Thumb
thankYouSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thankYouSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.75);

// Index
thankYouSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
thankYouSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

// Middle
thankYouSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
thankYouSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

// Ring
thankYouSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
thankYouSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

// Pinky
thankYouSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
thankYouSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);