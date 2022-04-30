from django.shortcuts import render,HttpResponse

# Create your views here.

def home(request):
   return render(request,"homepage.html")


def assess(request):
    return render(request,"assess.html")