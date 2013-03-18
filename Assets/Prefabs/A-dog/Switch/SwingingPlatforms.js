#pragma strict


function FixedUpdate()
{
	var oldrot:Quaternion = transform.rotation;
	var newY:Vector3;
	var newrot:Quaternion;
	if(transform.parent == null)
	{
		if(rigidbody == null)
		{
			newY = -1 * Vector3.Cross(Vector3.Cross(transform.forward, (Physics.gravity).normalized),transform.forward);
			newrot =  Quaternion.FromToRotation(transform.up,newY);
			transform.rotation = (newrot*transform.rotation);
		}
		else
		{
			newY = -1 * Vector3.Cross(Vector3.Cross(transform.forward, (Physics.gravity).normalized),transform.forward);
			newrot =  Quaternion.FromToRotation(transform.up,newY);
			rigidbody.MoveRotation(newrot*transform.rotation);
		}
	}
	else
	{
		if(rigidbody == null)
		{
			
			newY = -1 * Vector3.Cross(Vector3.Cross(transform.parent.forward, (Physics.gravity).normalized),transform.parent.forward);
			newrot =  Quaternion.FromToRotation(transform.parent.up,newY);
			transform.rotation = (newrot*transform.parent.rotation);
		}
		else
		{
			newY = -1 * Vector3.Cross(Vector3.Cross(transform.parent.forward, (Physics.gravity).normalized),transform.parent.forward);
			newrot =  Quaternion.FromToRotation(transform.parent.up,newY);
			rigidbody.MoveRotation(newrot*transform.parent.rotation);
		}
	}
	if(Input.GetKeyDown(KeyCode.T))
	{
		Debug.Log("NewY: " + newY);
		Debug.Log("NewRot: " + newrot.eulerAngles);
		Debug.Log("Final rot: " + (newrot*oldrot).eulerAngles);
	}
}