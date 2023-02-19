import {
  List,
  ListItem,
  Stack,
  styled,
  TextField,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Todo, todoRepository } from '../../repositories/todo.repository';
import { useMutation } from '../../libs/react-query';

const TodoListItem = styled(ListItem)({
  backgroundColor: '#ede7f6',
  transition: 'all 0.5s',
  padding: 0,
  margin: '16px auto',
  width: '80%',
  borderRadius: '16px',
  '&:hover': { transform: 'scale(1.1)', boxShadow: 1 },
});

function TodoList(props: { todo: Todo }) {
  // 1. destructure props
  const { todo } = props;

  // 2. lib hooks
  // 3. state hooks
  const [content, setContent] = useState('');

  // 4. query hooks
  const [updateTodo, { loading }] = useMutation(todoRepository.edit);

  // 5. form hooks
  const { control, getValues, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { ...todo },
  });
  const {
    fields: todoItems,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: 'todoItems',
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleUpdate = () => {
    handleSubmit(async ({ id, publishedDate, todoItems }) => {
      await updateTodo({
        variables: { id, publishedDate, todoItems },
      });
      setContent('');
    })();
  };
  const handleAppend = () => {
    if (content) {
      append({ content, done: false });
      handleUpdate();
      setContent('');
    }
  };
  const handleDelete = (index: number) => {
    remove(index);
    handleUpdate();
  };
  return (
    <List sx={{ width: '100%' }}>
      {todoItems.map((todoItem, index) => {
        return (
          <TodoListItem key={todoItem.id}>
            <Stack direction="row" sx={{ width: '100%', alignItems: 'center' }}>
              <Checkbox
                checked={todoItem.done}
                onChange={(event) => {
                  update(index, { ...todoItem, done: event.target.checked });
                  handleUpdate();
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={
                  <RadioButtonCheckedIcon sx={{ fill: '#7c4dff' }} />
                }
              />
              <Controller
                control={control}
                name={`todoItems.${index}.done`}
                render={({ field }) => {
                  return (
                    <Typography
                      sx={
                        field.value
                          ? {
                              textDecorationLine: 'line-through',
                              color: 'grey',
                            }
                          : {}
                      }
                    >
                      {getValues(`todoItems.${index}.content`)}
                    </Typography>
                  );
                }}
              />
            </Stack>
            <IconButton
              onClick={() => {
                handleDelete(index);
              }}
              sx={{ color: 'red', marginRight: '12px' }}
            >
              <DeleteIcon />
            </IconButton>
          </TodoListItem>
        );
      })}
      <TodoListItem>
        <TextField
          value={content}
          variant="standard"
          placeholder="새로운 항목을 추가해주세요."
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          onKeyDown={(event) => {
            // NOTE: onKeyDown은 enter입력시 함수가 2번 실행되는데 이걸 막기위한 코드
            if (event.nativeEvent.isComposing) {
              return;
            }
            if (event.key === 'Enter' && content) {
              append({ content, done: false });
            }
          }}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          sx={{ paddingLeft: '12px' }}
        />
        <LoadingButton
          disabled={!content}
          loading={loading}
          onClick={handleAppend}
          sx={{
            marginLeft: '16px',
            borderRadius: '0 16px 16px 0',
            backgroundColor: '#e1bee7',
            color: 'black',
            '&:hover': { backgroundColor: '#ce93d8' },
          }}
        >
          Add
        </LoadingButton>
      </TodoListItem>
    </List>
  );
}

export { TodoList };
