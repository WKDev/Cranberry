from django.shortcuts import render

# Create your views here.
def dashboard(request):
    return render(request, 'dashboard/index.html', {}) # 항목을 추가합니다.