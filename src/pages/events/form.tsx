import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import InputDate from '@/components/InputDate';
import InputFile from '@/components/InputFile';
import Button from '@/components/Button';

export default function Form({handleOnChange, handleOnSubmit}) {
  return(
    <>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <form className="border border-slate-200 dark:border-slate-500 rounded p-6" onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Event Name</FormLabel>
            <InputText id="name" name="name" type="text" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="date">Event Date</FormLabel>
            <InputDate id="date" name="date" type="datetime-local" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Event Location</FormLabel>
            <InputText id="location" name="location" type="text" required />
          </FormRow>

          <FormRow className="mb-6">
            <FormLabel htmlFor="image">File</FormLabel>
            <InputFile id="image" name="image" onChange={handleOnChange}/>
            <p className="text-sm mt-2">Accepted File Types: jpg, png</p>
          </FormRow>

          <Button>Submit</Button>
        </form>
      </Container>
    </>

  )
}
