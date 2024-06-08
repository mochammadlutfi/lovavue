<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use App\Settings\GeneralSetting;
use App\Models\Locale;
class BaseController extends Controller
{

    public function index()
    {
        $data = resolve(GeneralSetting::class)->toArray();
        $data['locales'] = Locale::where('is_active', true)->get();

        return response()->json($data);
    }

    public function setLang($lang)
    {
        App::setLocale($lang);
    }

}