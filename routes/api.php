<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\CompanyprofileController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\SociallinkController;
use App\Http\Controllers\GeneralqueryController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\HeroSectionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;

/*
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [LoginController::class, 'authenticate']);
Route::post('registration', [RegistrationController::class, 'register']);

Route::get('users', [UsersController::class, 'index']);
Route::get('users/edit/{id}', [UsersController::class, 'edit']);
Route::post('users/update/{id}', [UsersController::class, 'update']);
Route::delete('users/{user}', [UsersController::class, 'destroy']);

Route::post('companysetup', [CompanyprofileController::class, 'create']);
Route::get('companysetup', [CompanyprofileController::class, 'show']);
Route::post('companysetup/{id}', [CompanyprofileController::class, 'update']);

Route::post('profile/edit/{id}', [ProfileController::class, 'edit']);
Route::post('profile/update/{id}', [ProfileController::class, 'update']);

Route::get('image', [ImageController::class, 'show']);
Route::post('image/add', [ImageController::class, 'store']);
Route::get('image/edit/{id}', [ImageController::class, 'edit']);
Route::post('image/update/{id}', [ImageController::class, 'update']);
Route::delete('image/{image}', [ImageController::class, 'destroy']);

Route::get('hero-section', [HeroSectionController::class, 'show']);
Route::post('hero-section/add', [HeroSectionController::class, 'store']);
Route::get('hero-section/edit/{id}', [HeroSectionController::class, 'edit']);
Route::post('hero-section/update/{id}', [HeroSectionController::class, 'update']);
Route::delete('hero-section/{hero_section}', [HeroSectionController::class, 'destroy']);

Route::get('menu', [MenuController::class, 'show']);
Route::post('menu/add', [MenuController::class, 'store']);
Route::get('menu/edit/{id}', [MenuController::class, 'edit']);
Route::post('menu/update/{id}', [MenuController::class, 'update']);
Route::delete('menu/{menu}', [MenuController::class, 'destroy']);

Route::get('submenu/{id}', [MenuController::class, 'submenu']);

Route::get('section', [SectionController::class, 'show']);
Route::post('section/add', [SectionController::class, 'store']);
Route::get('section/edit/{id}', [SectionController::class, 'edit']);
Route::post('section/update/{id}', [SectionController::class, 'update']);
// Route::get('section/{slug}', [SectionController::class, 'showsection']);
Route::get('section/{id}', [SectionController::class, 'showsectionById']);
Route::delete('section/{section}', [SectionController::class, 'destroy']);

Route::get('component', [ComponentController::class, 'show']);
Route::post('component/add', [ComponentController::class, 'store']);
Route::get('component/edit/{id}', [ComponentController::class, 'edit']);
Route::post('component/update/{id}', [ComponentController::class, 'update']);
Route::delete('component/{component}', [ComponentController::class, 'destroy']);

Route::get('review', [ReviewController::class, 'show']);
Route::post('review/add', [ReviewController::class, 'store']);
Route::get('review/edit/{id}', [ReviewController::class, 'edit']);
Route::post('review/update/{id}', [ReviewController::class, 'update']);
Route::delete('review/{review}', [ReviewController::class, 'destroy']);

Route::get('faq', [FaqController::class, 'show']);
Route::post('faq/add', [FaqController::class, 'store']);
Route::get('faq/edit/{id}', [FaqController::class, 'edit']);
Route::post('faq/update/{id}', [FaqController::class, 'update']);
Route::delete('faq/{faq}', [FaqController::class, 'destroy']);

Route::get('sociallink', [SociallinkController::class, 'show']);
Route::post('sociallink/add', [SociallinkController::class, 'store']);
Route::get('sociallink/edit/{id}', [SociallinkController::class, 'edit']);
Route::post('sociallink/update/{id}', [SociallinkController::class, 'update']);
Route::delete('sociallink/{sociallink}', [SociallinkController::class, 'destroy']);

Route::get('generalquery', [GeneralqueryController::class, 'show']);
Route::post('generalquery/add', [GeneralqueryController::class, 'store']);
Route::get('generalquery/edit/{id}', [GeneralqueryController::class, 'edit']);
Route::post('generalquery/update/{id}', [GeneralqueryController::class, 'update']);

Route::get('role', [RoleController::class, 'show']);
Route::post('role/change-permissions', [RoleController::class, 'changePermission']);

Route::get('/permissions', function () {
    return response()->json(config('permissions.permissions'));
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
