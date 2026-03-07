import { useCallback, useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { getCandidates } from '../services/api';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCandidates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getCandidates();
      setCandidates(data);
    } catch {
      setError('Unable to load candidates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  if (isLoading) {
    return (
      <section>
        <h2 className='page-title'>Candidates</h2>
        <div className='candidate-grid'>
          {Array.from({ length: 6 }).map((_, index) => (
            <article key={index} className='candidate-card skeleton-card'>
              <div className='skeleton-line skeleton-title' />
              <div className='skeleton-line' />
              <div className='skeleton-line' />
              <div className='skeleton-line skeleton-short' />
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
        <button className='retry-button' onClick={loadCandidates}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2 className='page-title'>Candidates</h2>
      <div className='candidate-grid'>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};

export default Candidates;
