import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const ySign = new GestureDescription('Y');
// [
//     [
//       "Thumb",
//       "No Curl",
//       "Diagonal Up Right"
//     ],
//     [
//       "Index",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Middle",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Ring",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Pinky",
//       "No Curl",
//       "Diagonal Up Left"
//     ]
//   ]

//Thumb
ySign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ySign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Index
ySign.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
ySign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
ySign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
ySign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
ySign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
ySign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
ySign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
ySign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

export const yesSign = new GestureDescription('');

// Thumb
yesSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
yesSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.75);

// Index
yesSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
yesSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

// Middle
yesSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
yesSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

// Ring
yesSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
yesSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

// Pinky
yesSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
yesSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);

