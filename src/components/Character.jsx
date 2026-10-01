import Avatar from './Avatar.jsx';

export default function Character({ character, speaking }) {
  return (
    <div className={`actor ${speaking ? 'speaking' : ''} ${character.isPlayer ? 'player' : ''}`}>
      {speaking && <span className="talk-bubble">•••</span>}
      <Avatar look={character.look} speaking={speaking} />
      <span className="actor-name">{character.isPlayer ? 'คุณ' : character.name}</span>
    </div>
  );
}
