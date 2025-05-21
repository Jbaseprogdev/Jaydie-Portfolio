<!-- ContactForm.vue (Cyberpunk Styled + reCAPTCHA + Yahoo Email Integrated) -->
<template>
  <form @submit.prevent="submitForm" class="max-w-xl mx-auto bg-gray-900 border border-neon-green p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
    <h2 class="text-2xl font-bold mb-6 text-neon-green tracking-wide">Contact Me</h2>

    <input v-model="form.name" type="text" placeholder="Your Name"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green" />

    <input v-model="form.email" type="email" placeholder="Your Email"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green" />

    <textarea v-model="form.message" placeholder="Your Message"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded resize-none focus:outline-none focus:ring-2 focus:ring-neon-green" rows="5"></textarea>

    <button type="submit"
      class="bg-neon-red px-6 py-2 rounded-md text-white hover:bg-red-700 transition duration-200">Send</button>

    <p v-if="status" class="mt-4 text-neon-green">{{ status }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({ name: '', email: '', message: '' })
const status = ref('')
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const submitForm = async () => {
  try {
    const token = await grecaptcha.execute(siteKey, { action: 'submit' })
    const response = await axios.post('/api/contact', { ...form.value, recaptchaToken: token })
    status.value = 'Message sent!'
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Form submission error:', error)
    status.value = 'Something went wrong. Please try again.'
  }
}
</script>

<style scoped>
.border-neon-green {
  border-color: #8DB600;
}
.text-neon-green {
  color: #8DB600;
}
.bg-neon-red {
  background-color: #FF4444;
}
</style>

<!-- Laravel API Route and Controller (api.php and ContactController.php) -->
// routes/api.php
use App\Http\Controllers\ContactController;
Route::post('/contact', [ContactController::class, 'send']);

// app/Http/Controllers/ContactController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use App\Mail\ContactFormMessage;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request->recaptchaToken,
        ]);

        if (!$response->json('success') || $response->json('score') < 0.5) {
            return response()->json(['error' => 'reCAPTCHA verification failed.'], 422);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to('Jbaseprogdev@yahoo.com')->send(new ContactFormMessage($validated));

        return response()->json(['success' => true, 'message' => 'Message sent successfully.']);
    }
}

// app/Mail/ContactFormMessage.php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data) {
        $this->data = $data;
    }

    public function build() {
        return $this->subject('New Contact Form Message')
                    ->view('emails.contact')
                    ->with('data', $this->data);
    }
}

// resources/views/emails/contact.blade.php
<p><strong>Name:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>
<p><strong>Message:</strong></p>
<p>{{ $data['message'] }}</p>

<!-- .env (Backend) -->
MAIL_MAILER=smtp
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USERNAME=Jbaseprogdev@yahoo.com
MAIL_PASSWORD=your_yahoo_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=Jbaseprogdev@yahoo.com
MAIL_FROM_NAME="Jaydie Dingal"

RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

<!-- .env (Frontend / Vite) -->
VITE_RECAPTCHA_SITE_KEY=your_site_key_here

<!-- In public/index.html -->
<script src="https://www.google.com/recaptcha/api.js?render=your_site_key_here"></script>
<!-- ContactForm.vue -->
<template>
  <form @submit.prevent="submitForm"
    class="max-w-xl mx-auto bg-gray-900 border border-neon-green p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
    <h2 class="text-2xl font-bold mb-6 text-neon-green tracking-wide">Contact Me</h2>

    <input v-model="form.name" type="text" placeholder="Your Name"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green" />

    <input v-model="form.email" type="email" placeholder="Your Email"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green" />

    <textarea v-model="form.message" placeholder="Your Message"
      class="w-full mb-4 px-4 py-3 bg-gray-800 text-white border border-neon-green rounded resize-none focus:outline-none focus:ring-2 focus:ring-neon-green"
      rows="5"></textarea>

    <button type="submit"
      class="bg-neon-red px-6 py-2 rounded-md text-white hover:bg-red-700 transition duration-200">Send</button>

    <p v-if="status" class="mt-4 text-neon-green">{{ status }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({ name: '', email: '', message: '' })
const status = ref('')
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const waitForRecaptcha = () =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })

const submitForm = async () => {
  try {
    await waitForRecaptcha()
    const token = await grecaptcha.execute(siteKey, { action: 'submit' })
    const response = await axios.post('/api/contact', {
      ...form.value,
      recaptchaToken: token,
    })
    status.value = 'Message sent!'
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Form submission error:', error)
    status.value = 'Something went wrong. Please try again.'
  }
}
</script>

<style scoped>
.border-neon-green {
  border-color: #8DB600;
}
.text-neon-green {
  color: #8DB600;
}
.bg-neon-red {
  background-color: #FF4444;
}
</style>
