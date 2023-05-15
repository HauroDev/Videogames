import { getCurrentDate } from '../../utils/date'

const Form = () => {
  return (
    <form>
      <label htmlFor='name' />
      <input name='name' type='text' />

      <label htmlFor='description' />
      <textarea name='description' />

      <label htmlFor='platforms' />
      <select name='platforms'>
        <option value="">platform 1</option>
        <option value="">platform 2</option>
        <option value="">platform 3</option>
      </select>

      <label htmlFor='image' />
      <input name='image' type='text' />

      <label htmlFor='released' />
      <input name='released' type='date' max={getCurrentDate()}/>

      <label htmlFor='rating' />
      <input name='rating' type="number" min="0" max="5" step="0.1"/>

      <label htmlFor='genres' />
      <select name='genres'>
        <option value="">genre 1</option>
        <option value="">genre 2</option>
        <option value="">genre 3</option>
      </select>

    </form>
  )
}

export default Form
