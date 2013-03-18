#pragma strict

var direction:Vector3 = Vector3.forward;
var speed:float = 0.2f;
var activeonstart:boolean = false;
private var activated:boolean = false;

function Start () 
{
	if(activeonstart)
	{
		activated = true;
	}
}

function Activate()
{
	activated = true;
	if(animation.GetClip("rolling") != null)
	{
		animation.Play("rolling");
	}
}

function Deactivate()
{
	activated = false;
	if(animation.GetClip("rolling") != null)
	{
		animation.Stop("rolling");
	}
}

function OnTriggerStay(other : Collider)
{
	if(activated == false)
	{
		//Debug.Log("Not active");
		return;	
	}
    var ctrl:CharacterController = other.gameObject.GetComponent(typeof(CharacterController)) as CharacterController;
	if (ctrl) 
	{
		//Debug.Log("Character Controller found");
		ctrl.SimpleMove(speed * transform.TransformDirection(direction));
	}
	else
	{
		if(other.rigidbody != null)
		{
			other.rigidbody.MovePosition(other.rigidbody.position + transform.TransformDirection(direction)*speed);
		}
		//Debug.Log("No Character Controllers found");	
	}
}



//using UnityEngine;
//using System.Collections;
//
//public class ConveyorBelt : MonoBehaviour {
//	
//	public Vector3 direction = Vector3.forward;
//	public float speed = 0.02f;
//	
//	public bool activeOnStart = false;
//	bool active = false;
//	
//	void Start()
//	{
//		if(activeOnStart)
//		{
//			Activate();		
//		}
//	}
//	
//	public void OnTriggerStay(Collider other)
//	{
//		if(!active)
//		{
//			//Debug.Log("Not active");
//			return;	
//		}
//        CharacterController ctrl = other.gameObject.GetComponent(typeof(CharacterController)) as CharacterController;
//		if (ctrl) 
//		{
//			//Debug.Log("Character Controller found");
//			ctrl.SimpleMove(speed * transform.TransformDirection(direction));
//		}
//		else
//		{
//			//Debug.Log("No Character Controllers found");	
//		}
//    }
//	
//	void Activate()
//	{
//		active = true;
//		//animation.Play("clip");
//	}
//	void Deativate()
//	{
//		active = false;
//		//animation.Stop("clip");
//	}
//}
