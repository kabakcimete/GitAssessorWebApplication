from django.shortcuts import render,HttpResponse,redirect
from .forms import *
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.

def home(request):
   return render(request,"homepage.html")


def assess(request):
    return render(request,"assess.html")

def register_request(request):
   if request.method=="POST":
      form = NewUserForm(request.POST)
      if form.is_valid():
         user=form.save()
         login(request,user)
         messages.success(request,"Registration successful.")
         return redirect("../home/")
      messages.error(request,"Unsuccesful registration. Invalid information.")
   form = NewUserForm()
   return render(request=request, template_name="register.html",context={"register_form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("../home/")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="login.html", context={"login_form":form})

def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("../home/")