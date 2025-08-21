"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Mail, Phone, MapPin, GraduationCap, FileText, AlertCircle, CheckCircle } from "lucide-react"

export function EnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    academicInfo: {},
    preferences: {},
    documents: {},
  })
  const [dynamicId, setDynamicId] = useState("initial-id")
  const [dynamicText, setDynamicText] = useState("Texto inicial que cambia")
  const [showConditionalFields, setShowConditionalFields] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverTime, setServerTime] = useState(new Date())

  // Simular cambios dinámicos para testing
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicId(`dynamic-${Date.now()}`)
      setDynamicText(`Texto actualizado: ${new Date().toLocaleTimeString()}`)
      setServerTime(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateField = (field: string, value: string) => {
    const errors = { ...validationErrors }

    switch (field) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errors[field] = "Email inválido"
        } else {
          delete errors[field]
        }
        break
      case "phone":
        if (!/^\d{8,}$/.test(value.replace(/\D/g, ""))) {
          errors[field] = "Teléfono debe tener al menos 8 dígitos"
        } else {
          delete errors[field]
        }
        break
      case "dpi":
        if (!/^\d{13}$/.test(value.replace(/\D/g, ""))) {
          errors[field] = "DPI debe tener 13 dígitos"
        } else {
          delete errors[field]
        }
        break
      default:
        if (!value.trim()) {
          errors[field] = "Campo requerido"
        } else {
          delete errors[field]
        }
    }

    setValidationErrors(errors)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con elementos dinámicos */}
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif" data-testid="main-title">
                Universidad Mariano Gálvez
              </h1>
              <p className="text-primary-foreground/80" data-testid="subtitle">
                Sistema de Inscripciones en Línea
              </p>
            </div>
            <div className="text-right">
              <div id={dynamicId} className="dynamic-id text-sm" data-testid="dynamic-element">
                ID Dinámico: {dynamicId}
              </div>
              <div className="text-content-changes text-sm" data-testid="dynamic-text">
                {dynamicText}
              </div>
              <div className="text-sm" data-testid="server-time">
                Hora del servidor: {serverTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso de inscripción</span>
            <span className="text-sm text-muted-foreground">
              {currentStep} de {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>

        {/* Navegación de pasos */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : step < currentStep
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-muted text-muted-foreground border-border"
                }`}
                data-testid={`step-indicator-${step}`}
              >
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Paso {currentStep}:{" "}
                  {currentStep === 1
                    ? "Información Personal"
                    : currentStep === 2
                      ? "Información Académica"
                      : currentStep === 3
                        ? "Preferencias y Horarios"
                        : "Documentos y Confirmación"}
                </CardTitle>
                <CardDescription>Complete todos los campos requeridos para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Paso 1: Información Personal */}
                {currentStep === 1 && (
                  <div className="space-y-6 slide-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombres *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Ingrese sus nombres"
                          data-testid="first-name-input"
                          onChange={(e) => validateField("firstName", e.target.value)}
                        />
                        {validationErrors["firstName"] && (
                          <p className="text-destructive text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors["firstName"]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellidos *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Ingrese sus apellidos"
                          data-testid="last-name-input"
                          onChange={(e) => validateField("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dpi">DPI *</Label>
                        <Input
                          id="dpi"
                          name="dpi"
                          placeholder="1234567890123"
                          data-testid="dpi-input"
                          onChange={(e) => validateField("dpi", e.target.value)}
                        />
                        {validationErrors["dpi"] && (
                          <p className="text-destructive text-sm">{validationErrors["dpi"]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                        <Input id="birthDate" name="birthDate" type="date" data-testid="birth-date-input" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        data-testid="email-input"
                        onChange={(e) => validateField("email", e.target.value)}
                      />
                      {validationErrors["email"] && (
                        <p className="text-destructive text-sm">{validationErrors["email"]}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="12345678"
                          data-testid="phone-input"
                          onChange={(e) => validateField("phone", e.target.value)}
                        />
                        {validationErrors["phone"] && (
                          <p className="text-destructive text-sm">{validationErrors["phone"]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Género *</Label>
                        <Select name="gender" data-testid="gender-select">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione género" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección Completa *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Ingrese su dirección completa"
                        data-testid="address-input"
                        rows={3}
                      />
                    </div>

                    {/* Campo condicional que aparece/desaparece */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasWorkExperience"
                          data-testid="work-experience-checkbox"
                          onCheckedChange={(checked) => setShowConditionalFields(!!checked)}
                        />
                        <Label htmlFor="hasWorkExperience">Tengo experiencia laboral previa</Label>
                      </div>

                      {showConditionalFields && (
                        <div className="mt-4 p-4 border rounded-lg bg-muted/50 fade-in">
                          <Label htmlFor="workExperience">Describa su experiencia laboral</Label>
                          <Textarea
                            id="workExperience"
                            name="workExperience"
                            placeholder="Describa su experiencia laboral..."
                            data-testid="work-experience-textarea"
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Paso 2: Información Académica */}
                {currentStep === 2 && (
                  <div className="space-y-6 slide-in">
                    <div className="space-y-2">
                      <Label htmlFor="career">Carrera de Interés *</Label>
                      <Select name="career" data-testid="career-select">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una carrera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ingenieria-sistemas">Ingeniería en Sistemas</SelectItem>
                          <SelectItem value="ingenieria-industrial">Ingeniería Industrial</SelectItem>
                          <SelectItem value="administracion-empresas">Administración de Empresas</SelectItem>
                          <SelectItem value="contaduria-publica">Contaduría Pública</SelectItem>
                          <SelectItem value="derecho">Derecho</SelectItem>
                          <SelectItem value="psicologia">Psicología</SelectItem>
                          <SelectItem value="medicina">Medicina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="campus">Campus de Preferencia *</Label>
                      <Select name="campus" data-testid="campus-select">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un campus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="central">Campus Central</SelectItem>
                          <SelectItem value="zona-10">Campus Zona 10</SelectItem>
                          <SelectItem value="antigua">Campus Antigua Guatemala</SelectItem>
                          <SelectItem value="quetzaltenango">Campus Quetzaltenango</SelectItem>
                          <SelectItem value="escuintla">Campus Escuintla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Nivel de Estudios Previo *</Label>
                      <RadioGroup defaultValue="" name="educationLevel" data-testid="education-level-radio">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="diversificado" id="diversificado" />
                          <Label htmlFor="diversificado">Diversificado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="universitario-incompleto" id="universitario-incompleto" />
                          <Label htmlFor="universitario-incompleto">Universitario Incompleto</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="universitario-completo" id="universitario-completo" />
                          <Label htmlFor="universitario-completo">Universitario Completo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="postgrado" id="postgrado" />
                          <Label htmlFor="postgrado">Postgrado</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lastSchool">Último Centro de Estudios *</Label>
                        <Input
                          id="lastSchool"
                          name="lastSchool"
                          placeholder="Nombre del centro educativo"
                          data-testid="last-school-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Año de Graduación *</Label>
                        <Input
                          id="graduationYear"
                          name="graduationYear"
                          type="number"
                          placeholder="2023"
                          min="1950"
                          max="2024"
                          data-testid="graduation-year-input"
                        />
                      </div>
                    </div>

                    {/* DOM complejo anidado para testing */}
                    <div className="complex-nested-dom">
                      <div className="border rounded-lg p-4">
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Materias de Interés</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="math" data-testid="subject-math" />
                              <Label htmlFor="math" className="text-sm">
                                Matemáticas
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="physics" data-testid="subject-physics" />
                              <Label htmlFor="physics" className="text-sm">
                                Física
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="chemistry" data-testid="subject-chemistry" />
                              <Label htmlFor="chemistry" className="text-sm">
                                Química
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="programming" data-testid="subject-programming" />
                              <Label htmlFor="programming" className="text-sm">
                                Programación
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="economics" data-testid="subject-economics" />
                              <Label htmlFor="economics" className="text-sm">
                                Economía
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="languages" data-testid="subject-languages" />
                              <Label htmlFor="languages" className="text-sm">
                                Idiomas
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 3: Preferencias y Horarios */}
                {currentStep === 3 && (
                  <div className="space-y-6 slide-in">
                    <Tabs defaultValue="schedule" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="schedule" data-testid="schedule-tab">
                          Horarios
                        </TabsTrigger>
                        <TabsTrigger value="preferences" data-testid="preferences-tab">
                          Preferencias
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="schedule" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Jornada Preferida *</Label>
                          <RadioGroup defaultValue="" name="schedule" data-testid="schedule-radio">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="matutina" id="matutina" />
                              <Label htmlFor="matutina">Matutina (7:00 - 12:00)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="vespertina" id="vespertina" />
                              <Label htmlFor="vespertina">Vespertina (13:00 - 18:00)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nocturna" id="nocturna" />
                              <Label htmlFor="nocturna">Nocturna (18:30 - 22:00)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sabatina" id="sabatina" />
                              <Label htmlFor="sabatina">Sabatina (7:00 - 17:00)</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Días Disponibles</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                              <div key={day} className="flex items-center space-x-2">
                                <Checkbox id={day.toLowerCase()} data-testid={`day-${day.toLowerCase()}`} />
                                <Label htmlFor={day.toLowerCase()} className="text-sm">
                                  {day}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preferences" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="paymentMethod">Método de Pago Preferido *</Label>
                          <Select name="paymentMethod" data-testid="payment-method-select">
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione método de pago" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="efectivo">Efectivo</SelectItem>
                              <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                              <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Servicios Adicionales</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="transport" data-testid="service-transport" />
                              <Label htmlFor="transport">Transporte Universitario</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="cafeteria" data-testid="service-cafeteria" />
                              <Label htmlFor="cafeteria">Plan de Cafetería</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="library" data-testid="service-library" />
                              <Label htmlFor="library">Acceso Extendido a Biblioteca</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="sports" data-testid="service-sports" />
                              <Label htmlFor="sports">Actividades Deportivas</Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="comments">Comentarios Adicionales</Label>
                          <Textarea
                            id="comments"
                            name="comments"
                            placeholder="Ingrese cualquier comentario o solicitud especial..."
                            data-testid="comments-textarea"
                            rows={4}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {/* Paso 4: Documentos y Confirmación */}
                {currentStep === 4 && (
                  <div className="space-y-6 slide-in">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Revise toda la información antes de enviar su solicitud. Una vez enviada, no podrá modificarla.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Documentos Requeridos</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Fotocopia de DPI</span>
                          </div>
                          <Button variant="outline" size="sm" data-testid="upload-dpi">
                            Subir Archivo
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Certificado de Estudios</span>
                          </div>
                          <Button variant="outline" size="sm" data-testid="upload-certificate">
                            Subir Archivo
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Fotografía Reciente</span>
                          </div>
                          <Button variant="outline" size="sm" data-testid="upload-photo">
                            Subir Archivo
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" data-testid="terms-checkbox" />
                        <Label htmlFor="terms" className="text-sm">
                          Acepto los términos y condiciones de la universidad
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="privacy" data-testid="privacy-checkbox" />
                        <Label htmlFor="privacy" className="text-sm">
                          Acepto el tratamiento de mis datos personales
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" data-testid="newsletter-checkbox" />
                        <Label htmlFor="newsletter" className="text-sm">
                          Deseo recibir información sobre eventos y noticias
                        </Label>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Resumen de Inscripción</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Carrera:</strong> <span data-testid="summary-career">Ingeniería en Sistemas</span>
                        </p>
                        <p>
                          <strong>Campus:</strong> <span data-testid="summary-campus">Campus Central</span>
                        </p>
                        <p>
                          <strong>Jornada:</strong> <span data-testid="summary-schedule">Matutina</span>
                        </p>
                        <p>
                          <strong>Costo de Inscripción:</strong> <span data-testid="summary-cost">Q. 500.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botones de navegación */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    data-testid="prev-button"
                  >
                    Anterior
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={handleNextStep} data-testid="next-button" disabled={isLoading}>
                      {isLoading ? "Cargando..." : "Siguiente"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                          setIsLoading(false)
                          alert("¡Inscripción enviada exitosamente!")
                        }, 2000)
                      }}
                      data-testid="submit-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Enviando..." : "Enviar Inscripción"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con información adicional */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span data-testid="contact-phone">2411-1800</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span data-testid="contact-email">inscripciones@umg.edu.gt</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span data-testid="contact-address">7a. Avenida 13-76, Zona 9</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span data-testid="contact-hours">Lun-Vie: 8:00-17:00</span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Accordion */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger data-testid="faq-requirements">¿Qué documentos necesito?</AccordionTrigger>
                    <AccordionContent>
                      Necesitas fotocopia de DPI, certificado de estudios y fotografía reciente.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger data-testid="faq-cost">¿Cuál es el costo de inscripción?</AccordionTrigger>
                    <AccordionContent>
                      El costo de inscripción es de Q. 500.00 y debe pagarse al momento de la inscripción.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger data-testid="faq-schedule">¿Puedo cambiar mi horario después?</AccordionTrigger>
                    <AccordionContent>
                      Los cambios de horario están sujetos a disponibilidad y deben solicitarse en el departamento
                      académico.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Elementos para testing de texto dinámico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estado del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Servidor:</span>
                  <Badge variant="secondary" data-testid="server-status">
                    En línea
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base de datos:</span>
                  <Badge variant="secondary" data-testid="db-status">
                    Conectada
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Usuarios activos:</span>
                  <Badge variant="outline" data-testid="active-users">
                    {Math.floor(Math.random() * 100) + 50}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer con elementos adicionales para testing */}
      <footer className="bg-muted py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" data-testid="footer-link-admissions">
                    Admisiones
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-careers">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-campus">
                    Campus
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-contact">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" data-testid="footer-link-library">
                    Biblioteca
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-portal">
                    Portal Estudiantil
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-calendar">
                    Calendario
                  </a>
                </li>
                <li>
                  <a href="#" data-testid="footer-link-news">
                    Noticias
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" data-testid="social-facebook">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" data-testid="social-instagram">
                  Instagram
                </Button>
                <Button variant="outline" size="sm" data-testid="social-twitter">
                  Twitter
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p data-testid="copyright">© 2024 Universidad Mariano Gálvez. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
