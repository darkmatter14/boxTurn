#pragma strict



var target: GameObject;
enum SwitchState { Idling, FlipDown, Rotating, Reset };
var currentstate : SwitchState = SwitchState.Idling;

private var delta: Quaternion;
private var accum: float;
var duration: float = 1;
private var steps: float;
var angle: float = 90.0f;
var listening = false;
var direction: Vector3 = Vector3.forward;

function Start()
{
	if(target == null && transform.parent != null)
	{
		target = transform.parent.gameObject;
	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.gameObject.CompareTag("Player"))
	{
		listening = true;
	}
}

function OnTriggerExit(other : Collider)
{
	if(other.gameObject.CompareTag("Player"))
	{
		listening = false;
	}
}

function Update()
{
	if(listening == true)
	{
		if(Input.GetKeyDown("space"))
		{
			Activate();
		}
	}
}

function FixedUpdate()
{
	switch(currentstate)
	{
		case SwitchState.Idling:
			return;
			break;
		case SwitchState.FlipDown:
			if(!animation.isPlaying)
			{
				accum = 0;
				steps = duration / Time.fixedDeltaTime;
				var axis: Vector3;
				if(target.transform.parent == null)
				{
					axis = direction;
				}
				else
				{
					axis = transform.parent.TransformDirection(direction);
				}
				delta = Quaternion.AngleAxis( angle / steps, axis);
				currentstate = SwitchState.Rotating;
			}
			break;
		case SwitchState.Rotating:
			if(++accum > steps)
			{
				animation.Play("FlipUp");
				currentstate = SwitchState.Reset;
				return;
			}
			target.rigidbody.MoveRotation(delta * target.rigidbody.transform.rotation);
			break;
		case SwitchState.Reset:
			if(!animation.isPlaying)
			{
				currentstate = SwitchState.Idling;
			}
			break;
	}
}

function Activate()
{
	if(currentstate == SwitchState.Idling)
	{
		animation.Play("FlipDown");
		currentstate = SwitchState.FlipDown;
	}
}