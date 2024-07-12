"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validations"
import { useRouter } from "next/navigation"
import { createUser } from '@/lib/actions/patient.actions'
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from 'next/image'
import FileUploader from "../FileUploader"



 
const RegisterForm = ({ user }:{ user: User }) => {
    const[isLoading, setIsLoading] = useState(false);
    const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {
        const userData = { name, email, phone }

        const user = await createUser(userData);

        if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

        <section className="space-y-4">
            <h1 className="header">
                Welcome 🖐️
            </h1>
            <p className="text-dark-700">
                Let us know more about yourself.
            </p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Personal Information
                </h2>
            </div>
        </section>

        {/* Name */}
        <CustomFormField   
            fieldType = {FormFieldType.INPUT}
            control = {form.control} 
            name = 'name'
            label = 'Full Name'
            placeholder = 'ex: John Doe'
            iconSrc = '/assets/icons/user.svg'
            iconAlt = 'user'
        />

        {/* Email & Phone */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'email'
                label = 'Email'
                placeholder = 'ex: john.doe@example.com'
                iconSrc = '/assets/icons/email.svg'
                iconAlt = 'email'
            />

            <CustomFormField   
                fieldType = {FormFieldType.PHONE_INPUT}
                control = {form.control} 
                name = 'phone'
                label = 'Phone Number'
                placeholder = '(313) 123-4567'
            />
        </div>

        {/* Date & Gender */}
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField   
                fieldType = {FormFieldType.DATE_PICKER}
                control = {form.control} 
                name = 'birthDate'
                label = 'Date of Birth'
            />

            <CustomFormField   
                fieldType = {FormFieldType.SKELETON}
                control = {form.control} 
                name = 'gender'
                label = 'Gender'
                renderSkeleton={(field) => (
                    <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                )}
            />
        </div>
        
        {/* Address & Occupation */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'address'
                label = 'Address'
                placeholder = 'ex: 14th Street, New York'
            />

            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'occupation'
                label = 'Occupation'
                placeholder = 'ex: Software Engineer'
            />
        </div>

        {/* EmergencyContact & EmergencyContactNumber */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'emergencyContactName'
                label = 'Emergency Contact Name'
                placeholder = "Guardian's Name"
            />

            <CustomFormField   
                fieldType = {FormFieldType.PHONE_INPUT}
                control = {form.control} 
                name = 'emergencyContactNumber'
                label = 'Emergency Contact Number'
                placeholder = 'ex: (313) 123-4567'
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Medical Information
                </h2>
            </div>
        </section>

        {/* PrimaryPhysician */}
        <CustomFormField   
            fieldType = {FormFieldType.SELECT}
            control = {form.control} 
            name = 'primaryPhysician'
            label = 'Primary Physician'
            placeholder = 'Select a physician'
        >
            {Doctors.map((doctor) => (
               <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                            src={doctor.image}
                            width={32}
                            height={32}
                            alt='doctor'
                            className='rounded-full border border-dark-500'
                        />
                        <p>
                            {doctor.name}
                        </p>
                    </div>
               </SelectItem> 
            ))}
        </CustomFormField>

        {/* InsuranceProvider & InsurancePolicyNumber */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'insuranceProvider'
                label = 'Insurance Provider'
                placeholder = "ex: Blue Cross Blue Shield"
            />

            <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'insurancePolicyNumber'
                label = 'Insurance Policy Number'
                placeholder = 'ex: ABC123456789'
            />
        </div>

        {/* Allergies & CurrentMeds */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.TEXTAREA}
                control = {form.control} 
                name = 'allergies'
                label = 'Allergies (if any)'
                placeholder = "ex: Peanuts, Penicillin, Pollen"
            />

            <CustomFormField   
                fieldType = {FormFieldType.TEXTAREA}
                control = {form.control} 
                name = 'currentMedication'
                label = 'Current Medication (if any)'
                placeholder = 'ex: Ibuprofen 200mg, Paracetamol 500mg'
            />
        </div>
        
        {/*FamilyMedHistory & PastMedHistory*/}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField   
                fieldType = {FormFieldType.TEXTAREA}
                control = {form.control} 
                name = 'familyMedicalHistory'
                label = 'Family Medical History'
                placeholder = "ex: Mother had brain cancer, Father had heart disease"
            />

            <CustomFormField   
                fieldType = {FormFieldType.TEXTAREA}
                control = {form.control} 
                name = 'pastMedicalHistory'
                label = 'Past Medical History'
                placeholder = 'ex: Appendectomy, Tonsillectomy'
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Identification and Verification
                </h2>
            </div>
        </section>

        {/* IdentifSelection */}
        <CustomFormField   
            fieldType = {FormFieldType.SELECT}
            control = {form.control} 
            name = 'identificationType'
            label = 'iIdentification Type'
            placeholder = 'Select an Identification Type'
        >
            {IdentificationTypes.map((type) => (
               <SelectItem key={type} value={type}>
                    {type}
               </SelectItem> 
            ))}
        </CustomFormField>

        {/* IdentificationNum */}
        <CustomFormField   
                fieldType = {FormFieldType.INPUT}
                control = {form.control} 
                name = 'identificationNumber'
                label = 'Identification Number'
                placeholder = "ex: 123456789"
        />

        {/* ScannedCopy */}
        <CustomFormField   
            fieldType = {FormFieldType.SKELETON}
            control = {form.control} 
            name = 'identificationDocument'
            label = 'Scanned Copy of Identification Document'
            renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
            )}
        />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Consent and Privacy
                </h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to treatment'
        />
        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to disclosure of information'
        />
        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I consent to privacy policy'
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm