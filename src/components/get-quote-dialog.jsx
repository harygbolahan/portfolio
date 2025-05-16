"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, MessageSquarePlus } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const budgetRanges = [
  { label: "₦100,000 - ₦500,000", value: "100000-500000" },
  { label: "₦500,000 - ₦1,000,000", value: "500000-1000000" },
  { label: "₦1,000,000 - ₦2,000,000", value: "1000000-2000000" },
  { label: "₦2,000,000+", value: "2000000+" },
]

const projectTypes = [
  { label: "Website Development", value: "website" },
  { label: "Mobile App Development", value: "mobile-app" },
  { label: "E-commerce Solution", value: "ecommerce" },
  { label: "Custom Software", value: "custom-software" },
  { label: "UI/UX Design", value: "ui-ux" },
  { label: "Maintenance & Support", value: "maintenance" },
]

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  projectType: z.string({ required_error: "Please select a project type." }),
  budget: z.string({ required_error: "Please select a budget range." }),
  startDate: z.date({ required_error: "Please select a start date." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
})

export function GetQuoteDialog({ variant = "default" }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      description: "",
    },
  })

  const redirectToWhatsApp = (formData) => {
    const phoneNumber = "+2348136642399";
    
    // Get the project type label
    const projectTypeObj = projectTypes.find(type => type.value === formData.projectType);
    const projectTypeLabel = projectTypeObj ? projectTypeObj.label : formData.projectType;
    
    // Get the budget range label
    const budgetObj = budgetRanges.find(range => range.value === formData.budget);
    const budgetLabel = budgetObj ? budgetObj.label : formData.budget;
    
    // Format the date
    const formattedDate = format(formData.startDate, "PPP");
    
    // Create the message
    const message = `Hello! I'd like to request a quote for a project.

*Project Details:*
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
Project Type: ${projectTypeLabel}
Budget Range: ${budgetLabel}
Start Date: ${formattedDate}

*Project Description:*
${formData.description}

Thank you!`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  };

  function onSubmit(values) {
    setIsSubmitting(true);

    // Redirect to WhatsApp
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setOpen(false);
      
      toast({
        title: "Quote request submitted!",
        description: "Redirecting you to WhatsApp to complete your request.",
      });
      
      // Redirect to WhatsApp with form data
      redirectToWhatsApp(values);
      
      form.reset();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "mobile" ? (
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-design-accent1 to-design-accent2 hover:from-design-accent1/90 hover:to-design-accent2/90 text-white rounded-2xl py-6 shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span className="font-semibold">Get a Quote</span>
          </Button>
        ) : (
          <Button size="lg" className="bg-black text-white rounded-full px-8">
            Get a Quote
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below to get a custom quote for your project. I'll get back to you within 24-48 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Desired Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>When would you like the project to start?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your project requirements, goals, and any specific features you need..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The more details you provide, the more accurate your quote will be.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-gradient-to-r from-design-accent1 to-design-accent2 hover:from-design-accent1/90 hover:to-design-accent2/90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit & Continue on WhatsApp"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

