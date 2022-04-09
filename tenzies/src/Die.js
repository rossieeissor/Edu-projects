export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "rgb(250, 176, 40)" : "white",
  };
  return (
    <div className="die-wrap" style={styles} onClick={props.holdDice}>
      {props.face}
    </div>
  );
}
