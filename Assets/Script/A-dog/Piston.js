#pragma strict

enum PistonState { Idling, MovingOut, Full, MovingIn, Cooldown};
var currentstate: PistonState;
var direction:Vector3 = Vector3.up;
var distance:float = 5;
var moveinduration: float = 1f;
var moveoutduration:float = 1f;
var pausefullduration: float = 1f;
var pausecoolduration: float = 1f;
private var accum:float =0;
private var startingPos:Vector3;
private var endingPos:Vector3;



function Start () {

}
function Activate()
{
	if(currentstate == PistonState.Idling)
	{
		currentstate = PistonState.MovingOut;
		startingPos = transform.localPosition;
		endingPos = startingPos + (direction * distance);
	}
}
function Update () 
{
	Activate();
}

function FixedUpdate()
{
	switch(currentstate)
	{
	case PistonState.Idling:
		return;
		break;		
	case PistonState.MovingOut:
		accum += Time.deltaTime;
		transform.localPosition = Vector3.Lerp(startingPos,endingPos,accum/moveoutduration);
		if(accum >= moveoutduration)
		{
			currentstate = PistonState.Full;
			accum = 0;
		}
		break;
		
	case PistonState.Full:
		accum += Time.deltaTime;
		if(accum >= pausefullduration)
		{
			currentstate = PistonState.MovingIn;
			accum = 0;
		}
		break;
		
	case PistonState.MovingIn:
		accum += Time.deltaTime;
		transform.localPosition = Vector3.Lerp(endingPos,startingPos,accum/moveinduration);
		if(accum >= moveinduration)
		{
			currentstate = PistonState.Cooldown;
			accum = 0;
		}
		break;
	case PistonState.Cooldown:
		accum += Time.deltaTime;
		if(accum >= pausecoolduration)
		{
			currentstate = PistonState.Idling;
			accum = 0;
		}
		break;
	}
}