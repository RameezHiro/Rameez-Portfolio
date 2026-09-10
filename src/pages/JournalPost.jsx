import { useParams } from 'react-router-dom';

function JournalPost() {
  const { slug } = useParams();

  return (
    <div>
      DEVELOPER'S JOURNAL<br/>
      ARTICLE: {slug}<br/><br/>
      This is only a routing test.
    </div>
  );
}

export default JournalPost;