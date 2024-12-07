
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const iLoveYouSign = new GestureDescription('Thank You');

// Thumb
iLoveYouSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.75);

// Index
iLoveYouSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

// Middle
iLoveYouSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
iLoveYouSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

// Ring
iLoveYouSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
iLoveYouSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

// Pinky
iLoveYouSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);