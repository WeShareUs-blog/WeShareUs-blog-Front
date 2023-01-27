import { useState } from 'react';
import { today } from '../../libs/dayjs';
import { useQuery } from '../../libs/react-query';
import { todoRepository } from '../../repositories/todo.repository';

function TodoScreen() {
  // 1. destructure props
  // 2. lib hooks

  // 3. state hooks
  const [publishedDate, setPublishedDate] = useState(today());

  // 4. query hooks
  const { data: todo, loading: isTodoLoading } = useQuery(
    todoRepository.retrieve,
    {
      variables: { publishedDate },
    },
  );

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return <div>todo screen</div>;
}

export { TodoScreen };
